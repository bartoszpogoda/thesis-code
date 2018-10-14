package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Data
public class PlayerRegistrationForm {

    @NotNull(message = "Height of the player must be specified.")
    @Min(25)
    @Max(250)
    private Integer height;


    @NotNull(message = "Years of experience of the player must be specified.")
    @Min(0)
    @Max(100)
    private Integer yearsOfExperience;


}
