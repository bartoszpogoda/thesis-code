package com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class JwtToken {

    @NonNull
    private String token;
}
