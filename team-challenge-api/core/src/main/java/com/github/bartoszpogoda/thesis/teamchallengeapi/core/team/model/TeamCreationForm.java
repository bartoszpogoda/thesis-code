package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Data
public class TeamCreationForm {

    @NotNull(message = "Name of the team must be specified.")
    @Length(min = 5, max = 30, message = "Name must be between 5 and 30 characters long")
    private String name;


}