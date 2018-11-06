package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

@Data
public class NumericCriteriaDto {
    private String type;
    private double normalized;
    private double original;
}
