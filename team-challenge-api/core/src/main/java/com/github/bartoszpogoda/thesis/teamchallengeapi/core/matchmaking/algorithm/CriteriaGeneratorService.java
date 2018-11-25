package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.PositionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.TeamReview;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.TeamReviewService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Generates criterion with values based on data existing in the system.
 */
@Service
public class CriteriaGeneratorService {


    @Value("${teamchallengeapi.matchmaking.tag.fair-play.minimum-average}")
    private double minimumFairPlayAverageForTag = 3;

    @Value("${teamchallengeapi.matchmaking.tag.fair-play.minimum-reviews}")
    private double minimumReviewsForFairPlayTag = 1;

    @Value("${teamchallengeapi.matchmaking.tag.big-activity.minimum-finished-challenges-last-month}")
    private double minimumFinishedChallengesForActivityTag = 1;

    private final PlayerService playerService;
    private final PositionService positionService;
    private final TeamReviewService teamReviewService;
    private final ChallengeService challengeService;

    public List<NumericCriterion> generateNumeric(Team hostTeam, Team otherTeam) {
        List<NumericCriterion> criteria = new ArrayList<>();

        criteria.add(ageCriteria(hostTeam, otherTeam));
        criteria.add(distanceCriterion(hostTeam, otherTeam));
        criteria.add(skillCriterion(hostTeam, otherTeam));

        return criteria;
    }

    public List<BooleanCriterion> generateBoolean(Team hostTeam, Team otherTeam) {
        List<BooleanCriterion> criteria = new ArrayList<>();

        criteria.add(fairPlayCriterion(otherTeam));
        criteria.add(playAgainCriterion(hostTeam, otherTeam));
        criteria.add(bigActivityCriterion(otherTeam));

        return criteria;
    }

    public AgeCriterion ageCriteria(Team hostTeam, Team otherTeam) {
        double averageAgeHostTeam = hostTeam.getPlayers().stream()
                .mapToDouble(playerService::getAge).average().orElse(0);
        double averageAgeOtherTeam = otherTeam.getPlayers()
                .stream().mapToDouble(playerService::getAge).average().orElse(0);

        return new AgeCriterion(averageAgeOtherTeam - averageAgeHostTeam, averageAgeHostTeam, averageAgeOtherTeam);
    }

    public DistanceCriterion distanceCriterion(Team hostTeam, Team otherTeam) {
        return new DistanceCriterion(this.positionService.distance(hostTeam.getHome(), otherTeam.getHome()));
    }

    public SkillCriterion skillCriterion(Team hostTeam, Team otherTeam) {
        double sumBest3HostTeam = hostTeam.getPlayers().stream()
                .mapToDouble(Player::getSkill).sorted().limit(3).sum();
        double sumBest3OtherTeam = otherTeam.getPlayers().stream()
                .mapToDouble(Player::getSkill).sorted().limit(3).sum();

        return new SkillCriterion(sumBest3OtherTeam - sumBest3HostTeam, sumBest3OtherTeam);
    }


    public FairPlayCriterion fairPlayCriterion(Team otherTeam) {
        List<TeamReview> teamReviews = this.teamReviewService.findTeamReviews(otherTeam);

        double average = teamReviews.stream().collect(Collectors.averagingDouble(TeamReview::getFairPlayLevel));
        boolean fairPlayTag = teamReviews.size() >= minimumReviewsForFairPlayTag && average >= minimumFairPlayAverageForTag;

        return new FairPlayCriterion(fairPlayTag);
    }

    public PlayAgainCriterion playAgainCriterion(Team hostTeam, Team otherTeam) {

        return this.teamReviewService.findLatestReview(hostTeam, otherTeam)
                .map(review -> new PlayAgainCriterion(review.isPlayAgain()))
                .orElse(new PlayAgainCriterion(false));
    }

    public BigActivityCriterion bigActivityCriterion(Team otherTeam) {

        boolean bigActivityTag = this.challengeService.getListOfFinishedChallenges(otherTeam).size()
                >= minimumFinishedChallengesForActivityTag;

        return new BigActivityCriterion(bigActivityTag);
    }


    public CriteriaGeneratorService(PlayerService playerService, PositionService positionService, TeamReviewService teamReviewService, ChallengeService challengeService) {
        this.playerService = playerService;
        this.positionService = positionService;
        this.teamReviewService = teamReviewService;
        this.challengeService = challengeService;
    }

}
