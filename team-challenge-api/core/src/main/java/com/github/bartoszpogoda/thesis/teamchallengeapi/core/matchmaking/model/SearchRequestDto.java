package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class SearchRequestDto {

    @NotEmpty(message = "Searching team must be specified. ")
    private String searchingTeamId;

    private PreferencesDto preferences;
}
