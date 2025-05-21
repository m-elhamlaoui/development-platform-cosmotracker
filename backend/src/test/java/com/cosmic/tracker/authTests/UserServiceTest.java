package com.cosmic.tracker.authTests;

import com.cosmic.tracker.Users.UserRepository;
import com.cosmic.tracker.Users.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    void givenMocksAndService() {
        userRepository  = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        // Given a UserService constructed with mocked dependencies
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void shouldEncodePasswordAndSaveUser_whenGivenValidUsernamePasswordAndEmail() {
        // Given
        String username     = "testUser";
        String rawPassword  = "password";
        String email        = "user@example.com";
        String encodedPass  = "ENCODED_PASS";
        when(passwordEncoder.encode(rawPassword))
                .thenReturn(encodedPass);

        // When
        userService.save(username, rawPassword, email);

        // Then
        verify(passwordEncoder).encode(rawPassword);
        verify(userRepository).save(argThat(user ->
                user.getUsername().equals(username) &&
                        user.getPassword().equals(encodedPass) &&
                        user.getEmail().equals(email)
        ));
    }
}