package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UnknownRegionException extends ApiException {
    private static final ExceptionCode CODE = ExceptionCode.UNKNOWN_REGION;

    private static final String MESSAGE = "Unknown Region.";
    private static final String DETAILS = "Region was not defined in the system";

    public UnknownRegionException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
