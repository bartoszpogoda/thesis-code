package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ActionForbiddenException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.ACTION_FORBIDDEN;
    private static final String MESSAGE = "Action forbidden.";

    public ActionForbiddenException(String details) {
        super(CODE, MESSAGE, details);
    }
}

