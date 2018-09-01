package com.github.bartoszpogoda.thesis.teamchallengeapi.user;

import com.github.bartoszpogoda.thesis.teamchallengeapi.user.model.RegisterForm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(UserResource.USER_RESOURCE_URL)
public class UserResource {

    static final String USER_RESOURCE_URL = "/users";

    private final UserService userService;

    // TODO response code 201 and URI builder, hateoas maybe?
    @PostMapping
    public ResponseEntity<User> register(@Valid  @RequestBody RegisterForm registerForm) throws Exception {
        return userService.createUser(registerForm)
                .map(ResponseEntity::ok)
                .orElseThrow(Exception::new);
    }

    public UserResource(UserService userService) {
        this.userService = userService;
    }

}
