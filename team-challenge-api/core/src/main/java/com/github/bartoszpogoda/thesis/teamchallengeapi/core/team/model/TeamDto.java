package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model;

import lombok.Data;

@Data
public class TeamDto {

    private String id;

    private String name;

    private String managerName;

    private boolean active;

    private int balance;

}
