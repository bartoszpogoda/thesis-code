package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class JwtToken {

    @NonNull
    private String token;

}
