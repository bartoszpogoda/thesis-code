package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.Discipline;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamInvitationService {

    private TeamInvitationRepository teamInvitationRepository;
    private DisciplineService disciplineService;
    private TeamService teamService;
    private PlayerService playerService;
    private UserService userService;


    public Optional<TeamInvitation> invite(String teamId, String playerId) throws ApiException {

        // TODO Check if team and player are from the same DISCIPLINE

        Team team = teamService.findById(teamId).orElseThrow(TeamNotFoundException::new);
        Discipline discipline = this.disciplineService.getById(team.getDisciplineId()).orElseThrow(UnknownDisciplineException::new);
        Player manager = team.getManager();
        Player currentPlayer = playerService.getCurrentPlayer(team.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);

        if (!manager.equals(currentPlayer)) {
            throw new AccessForbiddenException("Player can't manage this team");
        }

        Player targetPlayer = playerService.getById(playerId).orElseThrow(PlayerNotFoundException::new);

        if (!targetPlayer.getDisciplineId().equals(team.getDisciplineId())) {
            // Throw DifferentDisciplinesException
        }

        if (targetPlayer.getTeam() != null) {
            throw new PlayerAlreadyInTeamException();
        }

        if (teamInvitationRepository.existsByTargetTeamIdAndTargetPlayerId(teamId, playerId)) {
            throw new AlreadyInvitedException();
        }

        if (team.getPlayers().size() >= discipline.getMaxTeamSize()) {
            throw new TeamIsFullException();
        }

        TeamInvitation teamInvitation = new TeamInvitation.TeamInvitationBuilder()
                .targetTeam(team).targetPlayer(targetPlayer).build();

        return Optional.ofNullable(teamInvitationRepository.save(teamInvitation));
    }

    @Transactional
    public void accept(String id) throws ApiException {

        TeamInvitation teamInvitation = teamInvitationRepository.findById(id).orElseThrow(TeamInvitationNotFoundException::new);
        String disciplineContext = teamInvitation.getTargetPlayer().getDisciplineId();
        Discipline discipline = this.disciplineService.getById(disciplineContext).orElseThrow(UnknownDisciplineException::new);
        Player currentPlayer = playerService.getCurrentPlayer(disciplineContext).orElseThrow(PlayerNotFoundException::new);
        Team targetTeam = teamInvitation.getTargetTeam();

        if (!teamInvitation.getTargetPlayer().equals(currentPlayer)) {
            throw new AccessForbiddenException();
        }

        if (currentPlayer.getTeam() != null) {
            throw new PlayerAlreadyInTeamException();
        }

        if (targetTeam.getPlayers().size() >= discipline.getMaxTeamSize()) {
            throw new TeamIsFullException();
        }

        currentPlayer.setTeam(targetTeam);

        if(targetTeam.getPlayers().size() == discipline.getMinTeamSize() - 1) {
            // team will have minimum team size, set it active
            targetTeam.setActive(true);
        }

        if(targetTeam.getPlayers().size() == discipline.getMaxTeamSize() - 1) {
            // cancel all other invitations when team is full
            teamInvitationRepository.deleteByTargetTeam(targetTeam);
        }

        // cancel all for player
        teamInvitationRepository.deleteByTargetPlayerIdAndTargetTeamDisciplineId(currentPlayer.getId(), disciplineContext);
    }

    @Transactional
    public void cancel(String id) throws UnknownDisciplineException, PlayerNotFoundException, TeamInvitationNotFoundException, AccessForbiddenException {
        TeamInvitation teamInvitation = teamInvitationRepository.findById(id).orElseThrow(TeamInvitationNotFoundException::new);
        Player currentPlayer = playerService.getCurrentPlayer(teamInvitation.getTargetTeam().getDisciplineId()).orElseThrow(PlayerNotFoundException::new);

        if (teamInvitation.getTargetTeam().getManager().equals(currentPlayer) || teamInvitation.getTargetPlayer().equals(currentPlayer)) {
            teamInvitationRepository.delete(teamInvitation);
        } else {
            throw new AccessForbiddenException();
        }
    }

    public Page<TeamInvitation> query(Pageable pageable, Optional<String> playerId, Optional<String> teamId) throws AccessForbiddenException, PlayerNotFoundException, TeamNotFoundException {

        User currentUser = userService.getCurrentUser().orElseThrow(AccessForbiddenException::new);
        boolean admin = currentUser.getAuthorities().contains(Authority.ADMIN);

        if(admin) {
            return teamInvitationRepository.findAll(teamInvitationQuery(playerId, teamId), pageable);
        } else {

            if(playerId.isPresent() && !teamId.isPresent()) {
                String id = playerId.get();
                Player player = playerService.getById(id).orElseThrow(PlayerNotFoundException::new);

                if(!player.getUser().equals(currentUser)) {
                    throw new AccessForbiddenException();
                }

                return teamInvitationRepository.findAll(teamInvitationQuery(playerId, Optional.empty()), pageable);

            } else if(teamId.isPresent()) {
                String id = teamId.get();
                Team team = teamService.findById(id).orElseThrow(TeamNotFoundException::new);

                if(!team.getManager().getUser().equals(currentUser)) {
                    throw new AccessForbiddenException();
                }

                return teamInvitationRepository.findAll(teamInvitationQuery(playerId, teamId), pageable);

            } else {
                throw new AccessForbiddenException();
            }
        }
    }

    private Specification<TeamInvitation> teamInvitationQuery(Optional<String> playerId, Optional<String> teamId) {
        return (Specification<TeamInvitation>) (root, query, builder) -> {

            List<Optional<Predicate>> potentialPredicates = new ArrayList<>();

            potentialPredicates.add(playerId.map(player -> builder.equal(root.<Player>get("targetPlayer").get("id"), player)));
            potentialPredicates.add(teamId.map(team -> builder.equal(root.<Team>get("targetTeam").get("id"), team)));

            List<Predicate> effectivePredicates = potentialPredicates.stream()
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());

            return builder.and(effectivePredicates.toArray(new Predicate[effectivePredicates.size()]));
        };
    }

    public TeamInvitationService(TeamInvitationRepository teamInvitationRepository, DisciplineService disciplineService, TeamService teamService, PlayerService playerService, UserService userService) {
        this.teamInvitationRepository = teamInvitationRepository;
        this.disciplineService = disciplineService;
        this.teamService = teamService;
        this.playerService = playerService;
        this.userService = userService;
    }

}
