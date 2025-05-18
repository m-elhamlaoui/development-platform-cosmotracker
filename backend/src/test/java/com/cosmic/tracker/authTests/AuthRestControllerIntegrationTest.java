package com.cosmic.tracker.authTests;

import com.cosmic.tracker.Users.JwtUtil;
import com.cosmic.tracker.Users.MyUser;
import com.cosmic.tracker.Users.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class AuthRestControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @Value("${app.jwt.secret}")
    private String secret;  // used to craft expired token

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void givenRegisteredUser() {
        userRepository.deleteAll();
        MyUser user = new MyUser();
        user.setUsername("validUser");
        user.setPassword(passwordEncoder.encode("validPassword"));
        user.setEmail("user@example.com");
        userRepository.save(user);
    }

    @Test
    void shouldReturnToken_whenCredentialsAreValid() throws Exception {
        // Given
        MyUser login = new MyUser();
        login.setUsername("validUser");
        login.setPassword("validPassword");

        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString());
    }

    @Test
    void shouldRejectLogin_whenPasswordIsWrong() throws Exception {
        // Given
        MyUser login = new MyUser();
        login.setUsername("validUser");
        login.setPassword("wrongPass");

        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldRejectLogin_whenUserDoesNotExist() throws Exception {
        // Given
        MyUser login = new MyUser();
        login.setUsername("noUser");
        login.setPassword("anyPass");


        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldRejectLogin_whenCredentialsMissing() throws Exception {
        // Given
        MyUser empty = new MyUser();

        // When & Then
        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(empty)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldAllowAccessToProtectedRoute_whenTokenIsValid() throws Exception {
        // Given
        String token = jwtUtil.generateToken("validUser");

        // When & Then
        mockMvc.perform(get("/api/protected")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().string("You are authenticated!"));
    }

    @Test
    void shouldDenyAccessToProtectedRoute_whenNoTokenProvided() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/protected"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldDenyAccessToProtectedRoute_whenTokenIsMalformed() throws Exception {
        // Given
        String badToken = "this.is.not.a.jwt";

        // When & Then
        mockMvc.perform(get("/api/protected")
                        .header("Authorization", "Bearer " + badToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldDenyAccessToProtectedRoute_whenTokenIsExpired() throws Exception {
        // Given: build an expired token manually
        byte[] keyBytes = Base64.getEncoder().encode(secret.getBytes());
        Key key = Keys.hmacShaKeyFor(keyBytes);
        Date now = new Date();
        Date expiredAt = new Date(now.getTime() - 1_000);
        String expiredToken = Jwts.builder()
                .setSubject("validUser")
                .setIssuedAt(new Date(now.getTime() - 2_000))
                .setExpiration(expiredAt)
                .signWith(key)
                .compact();

        // When & Then
        mockMvc.perform(get("/api/protected")
                        .header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldRegisterNewUserSuccessfully() throws Exception {
        // Given

        MyUser newUser = new MyUser();
        newUser.setUsername("newUser");
        newUser.setPassword("newPass");
        newUser.setEmail("new@example.com");

        // When & Then
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    void shouldRejectRegistration_whenUsernameAlreadyExists() throws Exception {
        // Given: “validUser” already saved in @BeforeEach
        MyUser duplicate = new MyUser();
        duplicate.setUsername("validUser");
        duplicate.setPassword("anyPass");
        duplicate.setEmail("x@y.com");
        // When & Then
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(duplicate)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Username already exists."));
    }
}
