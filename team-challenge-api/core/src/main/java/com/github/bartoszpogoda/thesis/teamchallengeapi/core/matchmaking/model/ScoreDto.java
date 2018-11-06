package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

@Data
public class ScoreDto {

    private double totalScore;

    private CriteriaDto comparison;
}
