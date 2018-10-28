package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model.TeamInvitationDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("invitations")
public class TeamInvitationResource {

    private DtoMappingService mappingService;

    private TeamInvitationService teamInvitationService;

    @PostMapping
    public ResponseEntity<TeamInvitationDto> invite(@RequestBody @Valid TeamInvitationDto teamInvitationForm)
            throws UnknownDisciplineException, PlayerNotFoundException, AccessForbiddenException,
            PlayerAlreadyInTeamException, TeamNotFoundException, InternalServerException, AlreadyInvitedException {

        return teamInvitationService.invite(teamInvitationForm.getTeamId(), teamInvitationForm.getPlayerId())
                .map(mappingService::mapToDto)
                .map(team -> ResponseEntity.created(createLocationByAddingIdToCurentRequest(team.getId())).body(team))
                .orElseThrow(InternalServerException::new);
    }

    @GetMapping
    public ResponseEntity<CustomPage<TeamInvitationDto>> query(Pageable pageable,
                                                               @RequestParam Optional<String> playerId,
                                                               @RequestParam Optional<String> teamId)
            throws TeamNotFoundException, AccessForbiddenException, PlayerNotFoundException {

        Page<TeamInvitationDto> teamInvitations = teamInvitationService.query(pageable, playerId, teamId).map(mappingService::mapToDto);
        return ResponseEntity.ok(PaginationUtil.toCustomPage(teamInvitations));

    }

    @PostMapping("/{id}/acceptance")
    public ResponseEntity<?> accept(@PathVariable String id)
            throws UnknownDisciplineException, PlayerNotFoundException, TeamInvitationNotFoundException,
            AccessForbiddenException, PlayerAlreadyInTeamException {

        teamInvitationService.accept(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable String id) throws UnknownDisciplineException,
            TeamInvitationNotFoundException, AccessForbiddenException, PlayerNotFoundException {

        teamInvitationService.cancel(id);
        return new ResponseEntity<TeamInvitation>(HttpStatus.NO_CONTENT);
    }

    public TeamInvitationResource(DtoMappingService mappingService, TeamInvitationService teamInvitationService) {
        this.mappingService = mappingService;
        this.teamInvitationService = teamInvitationService;
    }

}
