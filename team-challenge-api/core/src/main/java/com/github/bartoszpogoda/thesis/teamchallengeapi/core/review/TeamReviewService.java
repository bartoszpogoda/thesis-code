package com.github.bartoszpogoda.thesis.teamchallengeapi.core.review;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.ActionForbiddenException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.ChallengeNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.model.TeamReviewDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class TeamReviewService {

    private final PlayerService playerService;
    private final ChallengeService challengeService;
    private final TeamReviewRepository teamReviewRepository;

    public Optional<TeamReview> saveReview(TeamReviewDto teamReviewDto) throws ApiException  {

        // Get by id also checks access right to the challenge
        Challenge challenge = this.challengeService.getById(teamReviewDto.getChallengeId()).orElseThrow(ChallengeNotFoundException::new);
        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);

        Team currentTeam = currentPlayer.getTeam();
        Team otherTeamInChallenge = this.challengeService.getOtherTeam(challenge, currentTeam);

        if(!challenge.getStatus().equals(ChallengeStatus.Finished)) {
            throw new ActionForbiddenException("Challenge is not finished");
        }

        if(this.teamReviewRepository.findByChallengeAndReviewingTeam(challenge, currentTeam).isPresent()) {
            throw new ActionForbiddenException("Other team already reviewed for this challenge");
        }

        TeamReview review = TeamReview.builder()
                .challenge(challenge)
                .fairPlayLevel(teamReviewDto.getFairPlayLevel())
                .playAgain(teamReviewDto.isPlayAgain())
                .reviewDate(new DateTime())
                .reviewingTeam(currentTeam)
                .reviewedTeam(otherTeamInChallenge).build();

        return Optional.ofNullable(this.teamReviewRepository.save(review));
    }

    public Optional<TeamReview> getForChallenge(String id) throws ApiException {

        // Get by id also checks access right to the challenge
        Challenge challenge = this.challengeService.getById(id).orElseThrow(ChallengeNotFoundException::new);
        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);

        Team currentTeam = currentPlayer.getTeam();

        if(!challenge.getStatus().equals(ChallengeStatus.Finished)) {
            throw new ActionForbiddenException("Challenge is not finished");
        }

        return this.teamReviewRepository.findByChallengeAndReviewingTeam(challenge, currentTeam);
    }

    public List<TeamReview> findTeamReviews(Team team) {
        return this.teamReviewRepository.findByReviewedTeam(team);
    }

    public Optional<TeamReview> findLatestReview(Team reviewingTeam, Team revievedTeam) {
        return this.teamReviewRepository.findFirstByReviewingTeamAndReviewedTeamOrderByReviewDateDesc(reviewingTeam, revievedTeam);
    }

    public TeamReviewService(PlayerService playerService, ChallengeService challengeService, TeamReviewRepository teamReviewRepository) {
        this.playerService = playerService;
        this.challengeService = challengeService;
        this.teamReviewRepository = teamReviewRepository;
    }



}
