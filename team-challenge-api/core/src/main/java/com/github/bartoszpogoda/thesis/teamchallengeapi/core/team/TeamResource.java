package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.dto.ImagePathDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamCreationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
public class TeamResource {

    private TeamService teamService;

    private DtoMappingService mappingService;

    @PostMapping("/{disciplineId}/{regionId}/teams")
    public ResponseEntity<TeamDto> createTeam(@PathVariable String disciplineId, @PathVariable String regionId,
                                              @RequestBody @Valid TeamCreationForm teamCreationForm) throws UnknownDisciplineException, UnknownRegionException, PlayerAlreadyInTeamException, PlayerNotFoundException, InternalServerException {

        return teamService.createTeamForCurrentPlayer(disciplineId, regionId, teamCreationForm)
                .map(mappingService::mapToDto)
                .map(team -> ResponseEntity.created(createLocationByAddingIdToCurentRequest(team.getId())).body(team))
                .orElseThrow(InternalServerException::new);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page.")
    })
    @GetMapping("/{disciplineId}/{regionId}/teams")
    public ResponseEntity<CustomPage<TeamDto>> queryTeams(@PathVariable String disciplineId, @PathVariable String regionId,
                                                            Pageable pageable, @RequestParam(name = "name", required = false) String nameFragment) throws UnknownDisciplineException, UnknownRegionException {

        Page<Team> teams;
        if(nameFragment != null) {
            teams = teamService.findByName(pageable, disciplineId, regionId, nameFragment);
        } else {
            teams = teamService.findAllTeams(pageable, disciplineId, regionId);
        }

        Page<TeamDto> teamsDto = teams.map(mappingService::mapToDto);

        return ResponseEntity.ok(PaginationUtil.toCustomPage(teamsDto));
    }

    @GetMapping("/{disciplineId}/{regionId}/teams/{id}")
    public ResponseEntity<TeamDto> getTeam(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id) throws UnknownRegionException, UnknownDisciplineException, TeamNotFoundException {
        return teamService.getByIdAndDisciplineAndRegion(id, disciplineId, regionId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(TeamNotFoundException::new);
    }

    @GetMapping("/{disciplineId}/teams/current")
    public ResponseEntity<TeamDto> getCurrentPlayerTeam(@PathVariable String disciplineId) throws UnknownDisciplineException, TeamNotFoundException {
        return teamService.getCurrentPlayerTeam(disciplineId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(TeamNotFoundException::new);
    }


    @GetMapping("/{disciplineId}/{regionId}/teams/{id}/players")
    public ResponseEntity<List<PlayerDto>> getTeamMembers(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id) throws UnknownRegionException, UnknownDisciplineException {

        List<PlayerDto> teamMembers = teamService.getTeamMembers(disciplineId, regionId, id)
                .stream()
                .map(mappingService::mapToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(teamMembers);
    }

    @GetMapping("/{disciplineId}/{regionId}/teams/{id}/home")
    public ResponseEntity<PositionDto> getHome(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id) throws PositionNotFoundException, UnknownDisciplineException, UnknownRegionException {
        Position home = this.teamService.getHome(disciplineId, regionId, id);
        return ResponseEntity.ok(mappingService.mapToDto(home));
    }


    @PostMapping("/{disciplineId}/{regionId}/teams/{id}/home")
    public ResponseEntity<PositionDto> setHome(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id,
                                               @RequestBody @Valid PositionDto position) throws UnknownDisciplineException, UnknownRegionException, TeamNotFoundException, AccessForbiddenException, PlayerNotFoundException {
        Position home = this.teamService.setHome(disciplineId, regionId, id, position);

        return ResponseEntity.created(ResponseUtil.createLocationCurrentRequest()).body(mappingService.mapToDto(home));
    }

    @PostMapping("/{disciplineId}/{regionId}/teams/{id}/avatar")
    public ResponseEntity<?> uploadTeamAvatar(@PathVariable String disciplineId, @PathVariable String regionId,
                                                         @PathVariable String id,
                                                         @RequestParam("file") MultipartFile file) throws IOException, UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException, AccessForbiddenException, TeamNotFoundException {
        this.teamService.saveTeamAvatar(disciplineId, regionId, id, file);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{disciplineId}/{regionId}/teams/{id}/avatar")
    @ResponseBody
    public ResponseEntity<Resource> getTeamAvatar(@PathVariable String disciplineId, @PathVariable String regionId,
                                                  @PathVariable String id) throws MalformedURLException, ImageNotFoundException, TeamNotFoundException, UnknownDisciplineException, UnknownRegionException {
        Resource file = teamService.getTeamAvatar(disciplineId, regionId, id);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .cacheControl(CacheControl.maxAge(600, TimeUnit.SECONDS))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/{disciplineId}/teams/current/avatar")
    @ResponseBody
    public ResponseEntity<Resource> getCurrentTeamAvatar(@PathVariable String disciplineId) throws MalformedURLException, ImageNotFoundException, TeamNotFoundException, UnknownDisciplineException, UnknownRegionException {
        Team team = teamService.getCurrentPlayerTeam(disciplineId).orElseThrow(TeamNotFoundException::new);
        return getTeamAvatar(team.getDisciplineId(), team.getRegionId(), team.getId());
    }

    @PostMapping("/{disciplineId}/teams/current/avatar")
    public ResponseEntity uploadCurrentTeamAvatar(@PathVariable String disciplineId,
                                                  @RequestParam("file") MultipartFile file) throws IOException, UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException, AccessForbiddenException, TeamNotFoundException {
        Team team = teamService.getCurrentPlayerTeam(disciplineId).orElseThrow(TeamNotFoundException::new);

        return uploadTeamAvatar(team.getDisciplineId(), team.getRegionId(), team.getId(), file);
    }

    public TeamResource(TeamService teamService, DtoMappingService mappingService) {
        this.teamService = teamService;
        this.mappingService = mappingService;
    }

}
