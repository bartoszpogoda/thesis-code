package com.github.bartoszpogoda.thesis.teamchallengeapi.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.AbstractException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.ExceptionCode;

public class EmailAlreadyUsedException extends AbstractException {

    private static final ExceptionCode CODE = ExceptionCode.EMAIL_ALREADY_USED;
    private static final String MESSAGE = "Email already used.";
    private static final String DETAILS = "If you already registered to the system please log in to your account";

    public EmailAlreadyUsedException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
