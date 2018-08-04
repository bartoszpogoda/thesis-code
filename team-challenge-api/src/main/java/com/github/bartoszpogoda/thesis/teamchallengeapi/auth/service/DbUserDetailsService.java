package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.service;

import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.entity.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.entity.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
                .authorities(extractAuthorities(user))
                .build();
    }

    private Set<GrantedAuthority> extractAuthorities(User user) {
        return user.getAuthorities().stream()
                .map(Authority::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

}
