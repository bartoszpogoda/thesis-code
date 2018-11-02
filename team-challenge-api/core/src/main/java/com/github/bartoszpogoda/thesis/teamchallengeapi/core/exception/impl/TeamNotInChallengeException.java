package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TeamNotInChallengeException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.TEAM_NOT_IN_CHALLENGE;
    private static final String MESSAGE = "Team is not part of the challenge.";
    private static final String DETAILS = "";

    public TeamNotInChallengeException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
