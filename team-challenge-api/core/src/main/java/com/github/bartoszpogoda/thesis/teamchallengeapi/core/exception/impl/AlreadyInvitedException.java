package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyInvitedException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.ALREADY_INVITED;
    private static final String MESSAGE = "Player was already invited to your team.";
    private static final String DETAILS = "";

    public AlreadyInvitedException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
