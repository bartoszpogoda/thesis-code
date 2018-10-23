package com.github.bartoszpogoda.thesis.teamchallengeapi.core.configuration;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.auth.TokenResource;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.configuration.jwt.JwtAuthFilter;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.configuration.jwt.JwtAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    private final JwtAuthFilter jwtAuthFilter;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    public SecurityConfiguration(UserDetailsService userDetailsService, JwtAuthFilter jwtAuthFilter, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .csrf().disable()
            .authorizeRequests()
                // permit access to the TOKEN resource for JWT token generation on login
            .antMatchers(TokenResource.TOKEN_RESOURCE_URL).permitAll()
                // permit access to H2 console at least for now
            .antMatchers("/h2-console/**").permitAll()
                // permit access to Swagger docs
            .antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources", "/configuration/security", "/swagger-ui.html", "/webjars/**","/swagger-resources/configuration/**","/swagger-ui.html").permitAll()
            .antMatchers("/").permitAll()
                // permit register
            .antMatchers(HttpMethod.POST, "/users").permitAll()
            .anyRequest().authenticated()
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);

        // fix H2 console blank page after login
        http.headers().frameOptions().disable();

        // allow only SSL
        // http.requiresChannel().antMatchers("**").requiresSecure();

        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
