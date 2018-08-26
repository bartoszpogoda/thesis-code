package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component("userDetailsService")
public class DbUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public DbUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads user from the database based on his email.
     */
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> userByEmail = userRepository.findUserByEmail(email);

        return userByEmail.map(this::mapToUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

    private UserDetails mapToUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getEncodedPassword())
                .authorities(SecurityUtil.getAuthoritiesOfUser(user))
                .build();
    }



}
