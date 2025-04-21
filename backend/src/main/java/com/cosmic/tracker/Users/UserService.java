package com.cosmic.tracker.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public void save(String username, String rawPassword, String email) {
        MyUser user = new MyUser();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setEmail(email);
        userRepository.save(user);
    }
}
