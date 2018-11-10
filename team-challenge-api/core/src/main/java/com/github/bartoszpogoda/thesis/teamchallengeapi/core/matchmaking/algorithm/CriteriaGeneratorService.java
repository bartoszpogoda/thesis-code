package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.PositionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Generates criterion with values based on data existing in the system.
 */
@Service
public class CriteriaGeneratorService {

    private final PlayerService playerService;
    private final PositionService positionService;

    public List<NumericCriterion> generateNumeric(Team hostTeam, Team otherTeam) {
        List<NumericCriterion> criteria = new ArrayList<>();

        criteria.add(ageCriteria(hostTeam, otherTeam));
        criteria.add(distanceCriterion(hostTeam, otherTeam));
        criteria.add(skillCriterion(hostTeam, otherTeam));

        return criteria;
    }

    public List<BooleanCriterion> generateBoolean(Team hostTeam, Team otherTeam) {
        List<BooleanCriterion> criteria = new ArrayList<>();

        criteria.add(friendlyCriteria(hostTeam, otherTeam));

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

        return new SkillCriterion(sumBest3OtherTeam - sumBest3HostTeam);
    }


    public FriendlyCriterion friendlyCriteria(Team hostTeam, Team otherTeam) {
        // temp - always friendly
        return new FriendlyCriterion(true);
    }


    public CriteriaGeneratorService(PlayerService playerService, PositionService positionService) {
        this.playerService = playerService;
        this.positionService = positionService;
    }

}
