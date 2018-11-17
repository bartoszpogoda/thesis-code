package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TeamIsFullException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.TEAM_IS_FULL;
    private static final String MESSAGE = "Team has maximum amount of members.";
    private static final String DETAILS = "";

    public TeamIsFullException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
