package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.model.RegisterForm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") String id) throws Exception {
        // Check if ADMIN role or user asks for data regarding himself
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(Exception::new);
    }

    public UserResource(UserService userService) {
        this.userService = userService;
    }

}
