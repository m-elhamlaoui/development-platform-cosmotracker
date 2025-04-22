package com.cosmic.tracker.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser loginRequest) {
        MyUser user = userRepository.findByUsername(loginRequest.getUsername());

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        System.out.println();
        System.out.println();
        System.out.println("Received login request for " + loginRequest.getUsername());
        return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MyUser user) {
        System.out.println("Register request received for: " + user.getUsername());

        if (userRepository.findByUsername(user.getUsername()) != null) {
            System.out.println("Username already exists: " + user.getUsername());
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        System.out.println("Encoding password for new user: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        System.out.println("Saving user: " + user.getUsername());
        userRepository.save(user);

        System.out.println("User registered successfully: " + user.getUsername());
        return ResponseEntity.ok("User registered successfully!");
    }
}
