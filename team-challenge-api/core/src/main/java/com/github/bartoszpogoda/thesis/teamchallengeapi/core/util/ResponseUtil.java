package com.github.bartoszpogoda.thesis.teamchallengeapi.core.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class ResponseUtil {
    private ResponseUtil() {}

    public static URI createLocationByAddingIdToCurentRequest(String id) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
    }
}
