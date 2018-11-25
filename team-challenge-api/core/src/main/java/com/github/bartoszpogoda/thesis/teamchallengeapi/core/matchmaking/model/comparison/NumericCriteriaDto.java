package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison;

import lombok.Data;

@Data
public class NumericCriteriaDto {
    private String type;
    private double origin;
    private double difference;
    private double normalized;
}
