package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ComparisonRequestDto {

    @NotEmpty(message = "Host team id must be specified. ")
    private String hostTeamId;

    @NotEmpty(message = "Other team id must be specified. ")
    private String otherTeamId;

}
