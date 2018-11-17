package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class InternalServerException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.INTERNAL_SERVER_ERROR;
    private static final String MESSAGE = "Internal server exception.";
    private static final String DETAILS = "";

    public InternalServerException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
