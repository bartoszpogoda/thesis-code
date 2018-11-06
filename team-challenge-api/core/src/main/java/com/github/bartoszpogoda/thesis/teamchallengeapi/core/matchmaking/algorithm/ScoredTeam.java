package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.Criteria;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScoredTeam {
    private Team team;

    private double totalScore;

    private Criteria criteria;

}
