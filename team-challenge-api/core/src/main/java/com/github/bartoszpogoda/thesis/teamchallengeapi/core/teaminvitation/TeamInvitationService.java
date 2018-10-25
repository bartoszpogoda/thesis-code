package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.Authority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TeamInvitationService {

    private TeamInvitationRepository teamInvitationRepository;
    private DisciplineService disciplineService;
    private TeamService teamService;
    private PlayerService playerService;


    public Optional<TeamInvitation> invite(String disciplineId, String teamId, String playerId) throws UnknownDisciplineException, TeamNotFoundException, PlayerNotFoundException, AccessForbiddenException, PlayerAlreadyInTeamException, AlreadyInvitedException {

        disciplineService.checkDisciplineExists(disciplineId);

        Team team = teamService.getByIdAndDiscipline(teamId, disciplineId).orElseThrow(TeamNotFoundException::new);
        Player manager = team.getManager();
        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (!manager.equals(currentPlayer)) {
            throw new AccessForbiddenException("Player can't manage this team");
        }

        Player targetPlayer = playerService.get(playerId, disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (targetPlayer.getTeam() != null) {
            throw new PlayerAlreadyInTeamException();
        }

        if (teamInvitationRepository.existsByTargetTeamIdAndTargetTeamDisciplineIdAndTargetPlayerId(teamId, disciplineId, playerId)) {
            throw new AlreadyInvitedException();
        }

        TeamInvitation teamInvitation = new TeamInvitation.TeamInvitationBuilder()
                .targetTeam(team).targetPlayer(targetPlayer).build();

        return Optional.ofNullable(teamInvitationRepository.save(teamInvitation));
    }


    public List<TeamInvitation> getForPlayer(String disciplineId, String playerId) throws UnknownDisciplineException, PlayerNotFoundException, AccessForbiddenException {

        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (!(currentPlayer.getId().equals(playerId) || currentPlayer.getUser().getAuthorities().contains(Authority.ADMIN))) {
            throw new AccessForbiddenException();
        }

        return teamInvitationRepository.findByTargetPlayerIdAndTargetTeamDisciplineId(playerId, disciplineId);
    }

    public List<TeamInvitation> getForTeam(String disciplineId, String teamId) throws UnknownDisciplineException, PlayerNotFoundException, AccessForbiddenException {

        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);
        Team currentPlayerTeam = currentPlayer.getTeam();

        if (!(currentPlayerTeam.getManager().equals(currentPlayer) && currentPlayerTeam.getId().equals(teamId))) {
            throw new AccessForbiddenException();
        }

        return teamInvitationRepository.findByTargetTeamIdAndTargetTeamDisciplineId(teamId, disciplineId);
    }

    @Transactional
    public void accept(String disciplineId, String id) throws UnknownDisciplineException, PlayerAlreadyInTeamException, PlayerNotFoundException, TeamInvitationNotFoundException, AccessForbiddenException {

        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        TeamInvitation teamInvitation = teamInvitationRepository.findByIdAndTargetTeamDisciplineId(id, disciplineId).orElseThrow(TeamInvitationNotFoundException::new);

        if (!teamInvitation.getTargetPlayer().equals(currentPlayer)) {
            throw new AccessForbiddenException();
        }

        if (currentPlayer.getTeam() != null) {
            throw new PlayerAlreadyInTeamException();
        }

        // TODO check if Team size will not be over discipline specific limit

        currentPlayer.setTeam(teamInvitation.getTargetTeam());

        teamInvitationRepository.deleteByTargetPlayerIdAndTargetTeamDisciplineId(currentPlayer.getId(), disciplineId);
    }

    @Transactional
    public void cancel(String disciplineId, String id) throws UnknownDisciplineException, PlayerNotFoundException, TeamInvitationNotFoundException, AccessForbiddenException {

        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        TeamInvitation teamInvitation = teamInvitationRepository.findByIdAndTargetTeamDisciplineId(id, disciplineId).orElseThrow(TeamInvitationNotFoundException::new);

        if (teamInvitation.getTargetTeam().getManager().equals(currentPlayer) || teamInvitation.getTargetPlayer().equals(currentPlayer)) {
            teamInvitationRepository.delete(teamInvitation);
        } else {
            throw new AccessForbiddenException();
        }
    }

    public TeamInvitationService(TeamInvitationRepository teamInvitationRepository, DisciplineService disciplineService, TeamService teamService, PlayerService playerService) {
        this.teamInvitationRepository = teamInvitationRepository;
        this.disciplineService = disciplineService;
        this.teamService = teamService;
        this.playerService = playerService;
    }

}
