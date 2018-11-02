package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PlayerAlreadyExistsException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.PLAYER_ALREADY_EXISTS;
    private static final String MESSAGE = "Player already exists for this discipline.";
    private static final String DETAILS = "";

    public PlayerAlreadyExistsException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
