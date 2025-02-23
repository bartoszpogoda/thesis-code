package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidCredentialsException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.INVALID_CREDENTIALS;
    private static final String MESSAGE = "Invalid credentials.";
    private static final String DETAILS = "Either e-mail or password was invalid.";

    public InvalidCredentialsException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
