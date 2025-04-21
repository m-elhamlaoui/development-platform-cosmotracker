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
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
}
