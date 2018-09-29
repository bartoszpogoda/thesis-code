package com.github.bartoszpogoda.thesis.teamchallengeapi.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.AbstractException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UnknownDisciplineException extends AbstractException {
    private static final ExceptionCode CODE = ExceptionCode.UNKNOWN_DISCIPLINE;

    private static final String MESSAGE = "Unknown Discipline.";
    private static final String DETAILS = "Discipline was not defined in the system";

    public UnknownDisciplineException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
