package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.AbstractException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FacilityNotFoundException extends AbstractException {

    private static final ExceptionCode CODE = ExceptionCode.FACILITY_NOT_FOUND;
    private static final String MESSAGE = "Facility not found.";
    private static final String DETAILS = "";

    public FacilityNotFoundException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
