package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.model;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class RegisterForm {

    @Email(message = "Email must be valid e-mail format.")
    private String email;

    @Size(min = 7, max = 20, message = "Password must be between 7 and 20 characters long.")
    private String password;

    @NotEmpty(message = "Fullname can not be empty. ")
    private String fullName;

    @NotEmpty(message = "Birthday date can not be empty")
    @Pattern(regexp = "[0-9]{4}-[0-9]{2}-[0-9]{2}", message = "Date must be in YYYY-MM-dd format. ")
    private String birthdayDate;
}
