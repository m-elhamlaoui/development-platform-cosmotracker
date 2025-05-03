package com.cosmic.tracker.authTests;

import com.cosmic.tracker.Users.UserRepository;
import com.cosmic.tracker.Users.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;

public class UserServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    public void setup() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    public void testSaveUser_EncodesPasswordAndSaves() {
        String username = "testUser";
        String rawPassword = "password";
        String encodedPassword = "encodedPassword";
        String email = "test@example.com";

        when(passwordEncoder.encode(rawPassword)).thenReturn(encodedPassword);

        userService.save(username, rawPassword, email);

        verify(passwordEncoder).encode(rawPassword);
        verify(userRepository).save(Mockito.argThat(user ->
                user.getUsername().equals(username) &&
                        user.getPassword().equals(encodedPassword) &&
                        user.getEmail().equals(email)
        ));
    }
}
