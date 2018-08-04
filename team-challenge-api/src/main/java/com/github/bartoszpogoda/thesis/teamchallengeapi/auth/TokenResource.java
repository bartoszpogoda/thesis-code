package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.LoginForm;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(TokenResource.TOKEN_RESOURCE_URL)
public class TokenResource {

    public static final String TOKEN_RESOURCE_URL = "/token";

    @PostMapping
    public JwtToken create(@RequestBody LoginForm loginForm) {
        // TODO test
        // TODO implement
        return new JwtToken("FAKETOKEN");
    }

}
