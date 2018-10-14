package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.AccessForbiddenException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.model.RegisterForm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/users")
public class UserResource {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> register(@Valid  @RequestBody RegisterForm registerForm) throws Exception {
        return userService.createUser(registerForm)
                .map(user ->
                        ResponseEntity.created(createLocationByAddingIdToCurentRequest(user.getId())).body(user))
                .orElseThrow(Exception::new);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") String id) throws Exception {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(AccessForbiddenException::new);
    }

    public UserResource(UserService userService) {
        this.userService = userService;
    }

}
