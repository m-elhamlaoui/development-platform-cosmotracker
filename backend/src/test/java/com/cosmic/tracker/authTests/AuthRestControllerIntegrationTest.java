package com.cosmic.tracker.authTests;

import com.cosmic.tracker.Users.JwtUtil;
import com.cosmic.tracker.Users.MyUser;
import com.cosmic.tracker.Users.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthRestControllerIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setup() {
        userRepository.deleteAll();
        MyUser user = new MyUser();
        user.setUsername("validUser");
        user.setPassword(passwordEncoder.encode("validPassword"));
        user.setEmail("user@example.com");
        userRepository.save(user);
    }

    @Test
    public void testLoginSuccess() throws Exception {
        MyUser loginRequest = new MyUser();
        loginRequest.setUsername("validUser");
        loginRequest.setPassword("validPassword");

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    public void testLoginFailure_InvalidPassword() throws Exception {
        MyUser loginRequest = new MyUser();
        loginRequest.setUsername("validUser");
        loginRequest.setPassword("wrongPassword");

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginFailure_NonExistentUser() throws Exception {
        MyUser loginRequest = new MyUser();
        loginRequest.setUsername("nonUser");
        loginRequest.setPassword("any");

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testProtectedEndpoint_AccessWithToken() throws Exception {
        String token = jwtUtil.generateToken("validUser");

        mockMvc.perform(get("/api/protected")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    public void testProtectedEndpoint_AccessWithoutToken() throws Exception {
        mockMvc.perform(get("/api/protected"))
                .andExpect(status().isForbidden());
    }
}
