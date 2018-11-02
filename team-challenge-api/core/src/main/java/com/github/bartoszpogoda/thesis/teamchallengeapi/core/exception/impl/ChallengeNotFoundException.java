package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ChallengeNotFoundException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.CHALLENGE_NOT_FOUND;
    private static final String MESSAGE = "Challenge not found.";
    private static final String DETAILS = "";

    public ChallengeNotFoundException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
