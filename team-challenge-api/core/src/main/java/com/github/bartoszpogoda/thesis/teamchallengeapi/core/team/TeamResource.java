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
import java.util.Optional;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/teams")
public class TeamResource {

    private TeamService teamService;

    private DtoMappingService mappingService;

    @PostMapping
    public ResponseEntity<TeamDto> createTeam(@RequestBody @Valid TeamCreationForm teamCreationForm)
            throws UnknownDisciplineException, UnknownRegionException, PlayerAlreadyInTeamException, PlayerNotFoundException, InternalServerException {

        return teamService.createTeamForCurrentPlayer(teamCreationForm)
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
    public ResponseEntity<CustomPage<TeamDto>> queryTeams(Pageable pageable,
                                                          @RequestParam Optional<String> name,
                                                          @RequestParam Optional<String> disciplineId,
                                                          @RequestParam Optional<String> regionId) {

        Page<TeamDto> teamDtos = teamService.query(pageable, name, disciplineId, regionId).map(mappingService::mapToDto);
        return ResponseEntity.ok(PaginationUtil.toCustomPage(teamDtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeam(@PathVariable String id) throws UnknownRegionException, UnknownDisciplineException, TeamNotFoundException {
        return teamService.findById(id)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(TeamNotFoundException::new);
    }

    @GetMapping("/current")
    public ResponseEntity<TeamDto> getCurrentPlayerTeam(@PathVariable String disciplineId) throws UnknownDisciplineException, TeamNotFoundException {
        return teamService.getCurrentPlayerTeam(disciplineId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(TeamNotFoundException::new);
    }


    @GetMapping("/{id}/players")
    public ResponseEntity<List<PlayerDto>> getTeamMembers(@PathVariable String id) throws TeamNotFoundException {

        List<PlayerDto> teamMembers = teamService.getTeamMembers(id)
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
