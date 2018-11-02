package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotManagerException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.NOT_MANAGER;
    private static final String MESSAGE = "Player is not manager.";
    private static final String DETAILS = "Action is possible only for manager.";

    public NotManagerException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
