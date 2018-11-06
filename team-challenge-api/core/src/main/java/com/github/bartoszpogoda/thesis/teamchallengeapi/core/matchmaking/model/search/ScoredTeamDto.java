package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.CriteriaDto;
import lombok.Data;

@Data
public class ScoredTeamDto {
    private double totalScore;
    private String teamId;
    private CriteriaDto criteria;
}
