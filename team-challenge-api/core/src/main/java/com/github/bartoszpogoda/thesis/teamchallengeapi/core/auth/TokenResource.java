package com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model.LoginForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.InvalidCredentialsException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(TokenResource.TOKEN_RESOURCE_URL)
public class TokenResource {

    public static final String TOKEN_RESOURCE_URL = "/token";

    private TokenService tokenService;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    private Validator validator;

    @PostMapping
    public ResponseEntity<JwtToken> create(@RequestBody LoginForm loginForm, BindingResult result) throws InvalidCredentialsException {
        validator.validate(loginForm, result);
        if(result.hasErrors()) {
            throw new InvalidCredentialsException();
        }

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
    public TokenResource(TokenService tokenService, AuthenticationManager authenticationManager, UserService userService, Validator validator) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.validator = validator;
    }

}
