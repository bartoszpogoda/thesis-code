package com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.service;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.TokenService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.equalTo;

public class TokenServiceTest {

    private TokenService tokenService;

    @Before
    public void setUp() {
        tokenService = new TokenService();
    }

    @Test
    public void generateToken_TokenShouldContainUserEmail() {
        // given
        List<String> testRoles = Arrays.asList("ROLE_USER", "ROLE_MOD");
        Set<Authority> testAuthorities = testRoles.stream().map(Authority::new).collect(Collectors.toSet());

        User testUser = User.builder()
                .id("USER_1")
                .email("email@test.com")
                .authorities(testAuthorities)
                .encodedPassword("FakeEncodedPassword")
                .build();

        // when
        JwtToken token = tokenService.generateToken(testUser);

        // then
        String email = tokenService.getEmailFromToken(token);
        assertThat(email, equalTo("email@test.com"));
    }
}