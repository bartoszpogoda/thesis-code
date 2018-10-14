package com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class LoginForm {

    @Email(message = "Email must be valid e-mail format.")
    private String email;

    @Size(min = 7, max = 20, message = "Password must be between 7 and 20 characters long.")
    private String password;
}
