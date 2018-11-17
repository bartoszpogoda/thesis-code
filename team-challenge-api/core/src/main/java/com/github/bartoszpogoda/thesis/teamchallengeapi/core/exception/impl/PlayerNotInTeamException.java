package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PlayerNotInTeamException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.PLAYER_NOT_IN_TEAM;
    private static final String MESSAGE = "Player is not in team.";
    private static final String DETAILS = "Action not possible.";

    public PlayerNotInTeamException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
