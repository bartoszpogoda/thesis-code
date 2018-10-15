package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class TeamInvitationDto {

    private String id;

    @NotNull(message = "Team id can not be null. ")
    private String teamId;

    @NotNull(message = "Player id can not be null. ")
    private String playerId;

}
