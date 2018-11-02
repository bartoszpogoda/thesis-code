package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PlayerNotFoundException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.PLAYER_NOT_FOUND;
    private static final String MESSAGE = "Player not found.";
    private static final String DETAILS = "";

    public PlayerNotFoundException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
