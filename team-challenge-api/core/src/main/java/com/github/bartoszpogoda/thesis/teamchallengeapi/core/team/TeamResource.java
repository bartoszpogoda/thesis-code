package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamCreationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("{disciplineId}/{regionId}/teams")
public class TeamResource {

    private TeamService teamService;

    private DtoMappingService mappingService;

    @PostMapping
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
    @GetMapping
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

    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeam(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id) throws UnknownRegionException, UnknownDisciplineException, TeamNotFoundException {
        return teamService.getByIdAndDisciplineAndRegion(id, disciplineId, regionId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(TeamNotFoundException::new);
    }


    @GetMapping("/{id}/players")
    public ResponseEntity<List<PlayerDto>> getTeamMembers(@PathVariable String disciplineId, @PathVariable String regionId, @PathVariable String id) throws UnknownRegionException, UnknownDisciplineException {

        List<PlayerDto> teamMembers = teamService.getTeamMembers(disciplineId, regionId, id)
                .stream()
                .map(mappingService::mapToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(teamMembers);
    }

    public TeamResource(TeamService teamService, DtoMappingService mappingService) {
        this.teamService = teamService;
        this.mappingService = mappingService;
    }

}
