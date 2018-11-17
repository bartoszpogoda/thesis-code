package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.CriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import lombok.Data;

@Data
public class ScoredTeamDto {
    private double totalScore;
    private TeamDto team;
    private CriteriaDto criteria;
}
