package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class JwtToken {

    @NonNull
    private String token;
}
