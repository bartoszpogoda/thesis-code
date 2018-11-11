package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamFilteringService {

    private final ChallengeService challengeService;

    public List<Team> filter(Team hostTeam, List<Team> teams) {
        return teams.stream()
                // filter out host team
                .filter(team -> !team.equals(hostTeam))
                // filter out teams that are in challenge with host team
                .filter(team -> !challengeService.getOngoingChallengeBetweenTeams(hostTeam, team).isPresent())
                .collect(Collectors.toList());
    }

    public TeamFilteringService(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }
}
