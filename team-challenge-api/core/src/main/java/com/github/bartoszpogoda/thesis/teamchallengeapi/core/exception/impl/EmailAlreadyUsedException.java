package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.AbstractException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailAlreadyUsedException extends AbstractException {

    private static final ExceptionCode CODE = ExceptionCode.EMAIL_ALREADY_USED;
    private static final String MESSAGE = "Email already used.";
    private static final String DETAILS = "If you already registered to the system please log in to your account";

    public EmailAlreadyUsedException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
