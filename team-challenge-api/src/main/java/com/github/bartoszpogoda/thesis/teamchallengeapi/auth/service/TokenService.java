package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.service;


import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.entity.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.JwtToken;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public JwtToken generateToken(User user) {
        // TODO implement

        return new JwtToken("elo");
    }

}
