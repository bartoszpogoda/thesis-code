package com.github.bartoszpogoda.thesis.teamchallengeapi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
abstract public class AbstractException extends Exception {

    @Getter
    private ExceptionCode exceptionCode;

    @Getter
    private String message;

    @Getter
    private String details;

}
