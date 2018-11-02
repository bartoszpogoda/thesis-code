package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.model.ChallengeDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.joda.time.DateTime;
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
public class ChallengeService {

    private final TeamService teamService;
    private final PlayerService playerService;
    private final UserService userService;
    private final ChallengeRepository challengeRepository;

    private static boolean isActive(Challenge challenge) {
        return challenge.getStatus() == ChallengeStatus.Pending || challenge.getStatus() == ChallengeStatus.Accepted;
    }

    @Transactional
    public Optional<Challenge> create(ChallengeDto form) throws UnknownDisciplineException, PlayerNotFoundException, PlayerNotInTeamException, NotManagerException, TeamNotFoundException, InvalidOperationException, FacilityNotFoundException, InternalServerException, TeamAlreadyChallengedException {

        Player currentPlayer = this.playerService.getCurrentPlayer(form.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(currentTeam == null) {
            throw new PlayerNotInTeamException();
        }

        if(!currentTeam.getManager().equals(currentPlayer)) {
            throw new NotManagerException();
        }

        Team teamToChallenge = teamService.findById(form.getChallengedTeamId()).orElseThrow(TeamNotFoundException::new);

        // TODO uncomment after team activity is managed properly
//        if(!currentTeam.isActive()) {
//            throw new InvalidOperationException("Your team is innactive.");
//        }
//
//        if(!teamToChallenge.isActive()) {
//            throw new InvalidOperationException("Opponent team is innactive.");
//        }

        if(currentTeam.equals(teamToChallenge)) {
            throw new InvalidOperationException("Team can not challenge self.");
        }

        if(getOngoingChallengeBetweenTeams(currentTeam, teamToChallenge).isPresent()) {
            throw new TeamAlreadyChallengedException();
        }

        Challenge challenge = Challenge.builder().status(ChallengeStatus.Pending)
                .disciplineId(form.getDisciplineId())
                .challengingTeam(currentTeam)
                .challengedTeam(teamToChallenge)
                .creationDate(new DateTime()).build();

        return Optional.ofNullable(challengeRepository.save(challenge));
    }

    private Optional<Challenge> getOngoingChallengeBetweenTeams(Team teamA, Team teamB) {

        List<Challenge> challengesBetweenTeams = this.challengeRepository.findAllByChallengingTeamAndChallengedTeam(teamA, teamB);
        challengesBetweenTeams.addAll(this.challengeRepository.findAllByChallengingTeamAndChallengedTeam(teamB, teamA));

        return challengesBetweenTeams.stream()
                .filter(ChallengeService::isActive)
                .findFirst();
    }

    public Optional<Challenge> getById(String id) throws ChallengeNotFoundException, UnknownDisciplineException, PlayerNotFoundException, PlayerNotInTeamException, AccessForbiddenException {

        Challenge challenge = this.challengeRepository.findById(id).orElseThrow(ChallengeNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(currentTeam == null) {
            throw new PlayerNotInTeamException();
        }

        if(!(challenge.getChallengedTeam().equals(currentTeam) || challenge.getChallengingTeam().equals(currentTeam))) {
            throw new AccessForbiddenException();
        }

        return Optional.of(challenge);
    }

    public Page<Challenge> query(Pageable pageable, String teamId) throws AccessForbiddenException, TeamNotFoundException {
        User currentUser = userService.getCurrentUser().orElseThrow(AccessForbiddenException::new);
        boolean admin = currentUser.getAuthorities().contains(Authority.ADMIN);

        if(admin) {
            return challengeRepository.findAll(challengeQuery(teamId), pageable);
        } else {

            if(teamId != null) {
                Team team = teamService.findById(teamId).orElseThrow(TeamNotFoundException::new);

                if(!team.getPlayers().stream().map(Player::getUser).anyMatch(user -> user.equals(currentUser))) {
                    throw new AccessForbiddenException();
                }

                return challengeRepository.findAll(challengeQuery(teamId), pageable);

            } else {
                throw new AccessForbiddenException();
            }

        }
    }

    private Specification<Challenge> challengeQuery(String teamId) {
        return (Specification<Challenge>) (root, query, builder) -> {

            List<Optional<Predicate>> potentialPredicates = new ArrayList<>();

            potentialPredicates.add(Optional.ofNullable(teamId).map(team -> {
                Predicate challengingTeam = builder.equal(root.<Team>get("challengingTeam").get("id"), team);
                Predicate challengedTeam = builder.equal(root.<Team>get("challengedTeam").get("id"), team);

                return builder.or(challengingTeam, challengedTeam);
            }));

            List<Predicate> effectivePredicates = potentialPredicates.stream()
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());

            return builder.and(effectivePredicates.toArray(new Predicate[effectivePredicates.size()]));
        };
    }

    @Transactional
    public Optional<Challenge> reject(String id) throws ApiException {

        Challenge challenge = this.challengeRepository.findById(id).orElseThrow(ChallengeNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(currentTeam == null) {
            throw new PlayerNotInTeamException();
        }

        if(!(challenge.getChallengedTeam().equals(currentTeam) || challenge.getChallengingTeam().equals(currentTeam))) {
            throw new AccessForbiddenException();
        }

        if(challenge.getChallengingTeam().equals(currentTeam)) {
            throw new InvalidOperationException("Your team challenges can not be rejected by you.");
        }

        // Check status

        challenge.setStatus(ChallengeStatus.Rejected);
        return Optional.of(challenge);
    }

    @Transactional
    public Optional<Challenge> cancel(String id) throws ApiException {

        Challenge challenge = this.challengeRepository.findById(id).orElseThrow(ChallengeNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(currentTeam == null) {
            throw new PlayerNotInTeamException();
        }

        if(!(challenge.getChallengedTeam().equals(currentTeam) || challenge.getChallengingTeam().equals(currentTeam))) {
            throw new AccessForbiddenException();
        }

        if(challenge.getChallengedTeam().equals(currentTeam)) {
            throw new InvalidOperationException("You can't cancel challenges not created by your team.");
        }

        // Check status

        challenge.setStatus(ChallengeStatus.Canceled);
        return Optional.of(challenge);
    }


    public ChallengeService(TeamService teamService, PlayerService playerService, ChallengeRepository challengeRepository, UserService userService) {
        this.teamService = teamService;
        this.playerService = playerService;
        this.challengeRepository = challengeRepository;
        this.userService = userService;
    }

}
