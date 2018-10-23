package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model.TeamInvitationDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("{disciplineId}/invitations")
public class TeamInvitationResource {

    private DtoMappingService mappingService;

    private TeamInvitationService teamInvitationService;

    @PostMapping
    public ResponseEntity<TeamInvitationDto> invite(@PathVariable String disciplineId, @RequestBody @Valid TeamInvitationDto teamInvitationForm) throws UnknownDisciplineException, PlayerNotFoundException, AccessForbiddenException, PlayerAlreadyInTeamException, TeamNotFoundException, InternalServerException, AlreadyInvitedException {

        return teamInvitationService.invite(disciplineId, teamInvitationForm.getTeamId(), teamInvitationForm.getPlayerId())
                .map(mappingService::mapToDto)
                .map(team -> ResponseEntity.created(createLocationByAddingIdToCurentRequest(team.getId())).body(team))
                .orElseThrow(InternalServerException::new);

    }
    // TODO craete listForPlayerOrTeam and dispatch to listForPlayer or ListForTeam based on supplied parameter, else 400
    @GetMapping(params = "playerId")
    public ResponseEntity<List<TeamInvitationDto>> listForPlayer(@PathVariable String disciplineId, @RequestParam String playerId) throws AccessForbiddenException, UnknownDisciplineException, PlayerNotFoundException {

        List<TeamInvitationDto> teamInvitations = teamInvitationService.getForPlayer(disciplineId, playerId)
                .stream().map(mappingService::mapToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(teamInvitations);

    }

    @GetMapping(params = "teamId")
    public ResponseEntity<List<TeamInvitationDto>> listForTeam(@PathVariable String disciplineId, @RequestParam String teamId) throws AccessForbiddenException, UnknownDisciplineException, PlayerNotFoundException {
        List<TeamInvitationDto> teamInvitations = teamInvitationService.getForTeam(disciplineId, teamId)
                .stream().map(mappingService::mapToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(teamInvitations);
    }

    @PostMapping("/{id}/acceptance")
    public ResponseEntity<?> accept(@PathVariable String disciplineId, @PathVariable String id) throws UnknownDisciplineException, PlayerNotFoundException, TeamInvitationNotFoundException, AccessForbiddenException, PlayerAlreadyInTeamException {
        teamInvitationService.accept(disciplineId, id);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable String disciplineId, @PathVariable String id) throws UnknownDisciplineException, TeamInvitationNotFoundException, AccessForbiddenException, PlayerNotFoundException {
        teamInvitationService.cancel(disciplineId, id);

        return new ResponseEntity<TeamInvitation>(HttpStatus.NO_CONTENT);
    }

    public TeamInvitationResource(DtoMappingService mappingService, TeamInvitationService teamInvitationService) {
        this.mappingService = mappingService;
        this.teamInvitationService = teamInvitationService;
    }

}
