package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;

import com.github.bartoszpogoda.thesis.teamchallengeapi.TeamChallengeApiApplication;
import com.github.bartoszpogoda.thesis.teamchallengeapi.TestUtil;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.LoginForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TeamChallengeApiApplication.class)
@WebAppConfiguration
@AutoConfigureTestDatabase
public class TokenResourceTest {

    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private UserService userService;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void create_MissingBody_BadRequest() throws Exception {

        mockMvc.perform(post("/token"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void create_BadCredentials_BadRequest() throws Exception {
        // mock setup
        when(authenticationManager.authenticate(any(Authentication.class))).thenThrow(new BadCredentialsException(""));

        LoginForm loginForm = new LoginForm();
        loginForm.setEmail("proper@email.com");
        loginForm.setPassword("wrongPassword");

        mockMvc.perform(post("/token")
                            .contentType(TestUtil.APPLICATION_JSON_UTF8)
                            .content(TestUtil.convertObjectToJsonBytes(loginForm)))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void create_ProperCredentials_TokenInResponse200() throws Exception {
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail("proper@email.com");
        loginForm.setPassword("properPassword");

        // No throw - successfull authentication
        when(authenticationManager.authenticate(any())).thenReturn(null);

        User user = mock(User.class);

        JwtToken fakeToken = new JwtToken("fakeTokenValue");

        when(userService.getUserByEmail("proper@email.com")).thenReturn(Optional.ofNullable(user));
        when(tokenService.generateToken(user)).thenReturn(fakeToken);

        mockMvc.perform(post("/token")
                            .contentType(TestUtil.APPLICATION_JSON_UTF8)
                            .content(TestUtil.convertObjectToJsonBytes(loginForm)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", is("fakeTokenValue")));
    }
}