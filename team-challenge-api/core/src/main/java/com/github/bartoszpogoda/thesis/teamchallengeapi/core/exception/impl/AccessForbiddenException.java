package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AccessForbiddenException extends ApiException {
    private static final ExceptionCode CODE = ExceptionCode.UNAUTHORIZED;
    private static final String MESSAGE = "Couldn't allow access to this resource.";
    private static final String DETAILS = "";

    public AccessForbiddenException() {
        super(CODE, MESSAGE, DETAILS);
    }

    public AccessForbiddenException(String details) {
        super(CODE, MESSAGE, details);
    }

}
