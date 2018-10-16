package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class TeamInvitationDto {

    private String id;

    @NotNull(message = "Team id can not be null. ")
    private String teamId;

    private String teamName;

    private String teamManagerName;

    @NotNull(message = "Player id can not be null. ")
    private String playerId;

    private String playerName;

}
