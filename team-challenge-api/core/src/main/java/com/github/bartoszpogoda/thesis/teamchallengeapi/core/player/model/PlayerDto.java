package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model;

import lombok.Data;

@Data
public class PlayerDto {

    private String id;

    private String fullName;

    private int age;

    private int height;

    private int yearsOfExperience;

    private String teamName;

}
