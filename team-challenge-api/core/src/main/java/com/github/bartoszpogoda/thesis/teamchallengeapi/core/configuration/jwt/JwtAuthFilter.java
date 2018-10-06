package com.github.bartoszpogoda.thesis.teamchallengeapi.core.configuration.jwt;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String HEADER_AUTH = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    private final TokenService tokenService;

    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthFilter(TokenService tokenService, UserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            extractAuthToken(request)
                    .map(JwtToken::new)
                    .map(tokenService::getEmailFromToken)
                    .map(this::getAuthentication)
                    .ifPresent(authentication -> {
                        if(SecurityContextHolder.getContext().getAuthentication() == null) {
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            logger.info("Authenticated successfully");
                        }
                    });
        } catch (Exception e) {
            logger.info("Unauthorized due to: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private Optional<String> extractAuthToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(HEADER_AUTH))
                .filter(header -> header.startsWith(TOKEN_PREFIX))
                .map(header -> header.replace(TOKEN_PREFIX, ""));
    }

    private Authentication getAuthentication(String email){
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
