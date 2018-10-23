package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model;

import io.swagger.annotations.ApiParam;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class TeamInvitationDto {

    private String id;

    @ApiParam(required = true)
    @NotNull(message = "Team id can not be null. ")
    private String teamId;

    private String teamName;

    private String teamManagerName;

    @ApiParam(required = true)
    @NotNull(message = "Player id can not be null. ")
    private String playerId;

    private String playerName;

}
