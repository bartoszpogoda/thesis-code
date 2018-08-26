package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.LoginForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.InvalidCredentialsException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(TokenResource.TOKEN_RESOURCE_URL)
public class TokenResource {

    public static final String TOKEN_RESOURCE_URL = "/token";

    private TokenService tokenService;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    @PostMapping
    public ResponseEntity<JwtToken> create(@Valid  @RequestBody LoginForm loginForm) throws InvalidCredentialsException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginForm.getEmail(),
                            loginForm.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }

        return userService.getUserByEmail(loginForm.getEmail())
                .map(tokenService::generateToken)
                .map(ResponseEntity::ok)
                .orElseThrow(InvalidCredentialsException::new);
    }

    @PostMapping(path = "/renewal")
    public ResponseEntity<JwtToken> renew() throws Exception {

        return userService.getCurrentUser()
                .map(tokenService::generateToken)
                .map(ResponseEntity::ok)
                .orElseThrow(InvalidCredentialsException::new);

    }

    @Autowired
    public TokenResource(TokenService tokenService, AuthenticationManager authenticationManager, UserService userService) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

}
