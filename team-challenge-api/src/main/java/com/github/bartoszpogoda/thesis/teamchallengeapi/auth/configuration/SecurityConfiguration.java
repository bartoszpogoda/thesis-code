package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.configuration;

import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.TokenResource;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {



    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .csrf().disable()
            .authorizeRequests()
                // permit access to the TOKEN resource for JWT token generation on login
            .antMatchers(TokenResource.TOKEN_RESOURCE_URL).permitAll()
                // permit access to H2 console at least for now
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/").permitAll()
            .anyRequest().authenticated();

        // fix H2 console blank page after login
        http.headers().frameOptions().disable();
    }
}
