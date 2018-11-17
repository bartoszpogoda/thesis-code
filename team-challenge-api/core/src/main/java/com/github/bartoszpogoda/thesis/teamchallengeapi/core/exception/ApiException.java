package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
abstract public class ApiException extends Exception {

    @Getter
    private ExceptionCode exceptionCode;

    @Getter
    private String message;

    @Getter
    private String details;

}
