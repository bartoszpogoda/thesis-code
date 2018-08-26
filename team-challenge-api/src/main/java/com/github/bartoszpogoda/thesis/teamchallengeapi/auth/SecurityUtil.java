package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.user.Authority;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

final class SecurityUtil {

    private SecurityUtil() { }

    static Set<GrantedAuthority> getAuthoritiesOfUser(User user) {
        return user.getAuthorities().stream()
                .map(Authority::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

}
