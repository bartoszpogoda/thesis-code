package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TeamAlreadyChallengedException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.TEAM_ALREADY_CHALLENGED;
    private static final String MESSAGE = "Team was already challenged.";
    private static final String DETAILS = "Action not possible.";

    public TeamAlreadyChallengedException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
