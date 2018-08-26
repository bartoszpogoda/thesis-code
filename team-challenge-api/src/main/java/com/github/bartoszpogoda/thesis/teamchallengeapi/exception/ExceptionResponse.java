package com.github.bartoszpogoda.thesis.teamchallengeapi.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.lang.annotation.Annotation;
import java.util.Date;
import java.util.Optional;

@AllArgsConstructor
@Data
@Builder
public class ExceptionResponse {

    private ExceptionCode code;
    @JsonIgnore
    private HttpStatus status;
    private Date timestamp;
    private String message;
    private String details;

    public static ExceptionResponse fromAbstractException(AbstractException exception) {

        HttpStatus status = getHttpStatusAnnotation(exception)
                                    .map(ResponseStatus::value)
                                    .orElse(HttpStatus.BAD_REQUEST);

        return ExceptionResponse.builder()
                .code(exception.getExceptionCode())
                .status(status)
                .message(exception.getMessage())
                .details(exception.getDetails())
                .timestamp(new Date())
                .build();
    }

    private static Optional<ResponseStatus> getHttpStatusAnnotation(AbstractException exception) {
        return Optional.ofNullable(exception.getClass().getAnnotation(ResponseStatus.class));
    }

}
