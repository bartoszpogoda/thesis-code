package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Data
public class PlayerRegistrationForm {

    @NotNull(message = "Height of the player must be specified. ")
    @Min(25)
    @Max(250)
    private Integer height;


    @NotNull(message = "Skill of the player must be specified (0-10 scale). ")
    @Min(0)
    @Max(10)
    private Integer skill;

    @NotNull(message = "Discipline for which player registers must be specified. ")
    private String disciplineId;

    @NotNull(message = "Region for which player registers must be specified. ")
    private String regionId;

}
