package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import lombok.Data;

@Data
public class PreferencesDto {

    private double weightAgeDiff;
    private double weightDistance;
    private double weightExperienceDiff;

    private boolean playAgain;
    // TODO friendly etc.
}
