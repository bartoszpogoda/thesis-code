package com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception;

import lombok.extern.java.Log;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.stream.Collectors;

@Log
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public final ResponseEntity<ExceptionResponse> handleAuthException() {

        ExceptionResponse exceptionResponse = ExceptionResponse.builder().code(ExceptionCode.UNAUTHORIZED)
                .message("Couldn't authorize the request.")
                .details("")
                .timestamp(new Date())
                .build();

        return new ResponseEntity<>(exceptionResponse, HttpStatus.UNAUTHORIZED);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        String details = ex.getBindingResult().getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining(" "));

        ExceptionResponse exceptionResponse = ExceptionResponse.builder().code(ExceptionCode.VALIDATION_FAILED)
                .message("Validation failed.")
                .details(details)
                .timestamp(new Date())
                .build();

        return ResponseEntity.badRequest().body(exceptionResponse);
    }

    @ExceptionHandler(ApiException.class)
    public final ResponseEntity<ExceptionResponse> handleTeamChallengeApiException(ApiException ex) {

        ExceptionResponse exceptionResponse = ExceptionResponse.fromAbstractException(ex);

        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleException(Exception e) {

        ExceptionResponse exceptionResponse = ExceptionResponse.builder().code(ExceptionCode.INTERNAL_SERVER_ERROR)
                .message("Server error")
                .details("")
                .timestamp(new Date())
                .build();

        e.printStackTrace();

        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
