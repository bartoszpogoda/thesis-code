package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

@Data
public class BooleanCriteriaDto {
    private String type;

    private boolean value;
}
