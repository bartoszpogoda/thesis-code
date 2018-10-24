package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.AbstractException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ImageNotFoundException extends AbstractException {

    private static final ExceptionCode CODE = ExceptionCode.IMAGE_NOT_FOUND;
    private static final String MESSAGE = "Image not found.";
    private static final String DETAILS = "";

    public ImageNotFoundException() {
        super(CODE, MESSAGE, DETAILS);
    }
}
