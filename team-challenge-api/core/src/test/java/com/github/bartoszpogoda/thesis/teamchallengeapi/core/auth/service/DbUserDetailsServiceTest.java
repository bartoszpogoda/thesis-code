package com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.service;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.TeamChallengeApiCore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TeamChallengeApiCore.class)
@AutoConfigureTestDatabase
public class DbUserDetailsServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    // test context
    private final String TEST_USER_ID = "0000001";
    private final String TEST_USER_EMAIL = "test@mail.com";
    private final String TEST_USER_ENCODED_PASS = "@#$%^&$*(!@&$Y!*$!@UHI$!@H$U!HI!H";

    private final List<String> TEST_ROLES = Arrays.asList("ROLE_USER", "ROLE_MOD");

    private static final String NON_EXISTING_EMAIL = "notexisting@mail.com";

    private User testUser;
    private Set<Authority> testAuthorities;

    @Before
    public void setUp() {
        initTestAuthorities();
        initTestUser();

        when(userRepository.findUserByEmail(TEST_USER_EMAIL)).thenReturn(Optional.of(testUser));
        when(userRepository.findUserByEmail(NON_EXISTING_EMAIL)).thenReturn(Optional.empty());
    }

    private void initTestAuthorities() {
        testAuthorities = TEST_ROLES.stream().map(Authority::new).collect(Collectors.toSet());
    }

    private void initTestUser() {
        testUser = User.builder()
                .id(TEST_USER_ID)
                .email(TEST_USER_EMAIL)
                .authorities(testAuthorities)
                .encodedPassword(TEST_USER_ENCODED_PASS)
                .build();
    }

    @Test
    public void shouldBuildProperUserDetails() {
        // when
        UserDetails userDetails = userDetailsService.loadUserByUsername(TEST_USER_EMAIL);

        // then
        assertThat(userDetails.getUsername(), equalTo(TEST_USER_EMAIL));
        assertThat(userDetails.getPassword(), equalTo(TEST_USER_ENCODED_PASS));
        assertThat(userDetails.getAuthorities().size(), equalTo(testAuthorities.size()));

        List<String> authorityNames = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        assertThat(authorityNames, containsInAnyOrder(TEST_ROLES.toArray()));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void shouldThrowExceptionWhenUserNotFound() {
        // when
        UserDetails userDetails = userDetailsService.loadUserByUsername(NON_EXISTING_EMAIL);
    }
}