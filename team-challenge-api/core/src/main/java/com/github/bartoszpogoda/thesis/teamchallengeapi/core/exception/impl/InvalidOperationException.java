package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidOperationException extends ApiException {

    private static final ExceptionCode CODE = ExceptionCode.INVALID_OPERATION_EXCEPTION;
    private static final String MESSAGE = "Invalid operation.";

    public InvalidOperationException(String details) {
        super(CODE, MESSAGE, details);
    }
}
