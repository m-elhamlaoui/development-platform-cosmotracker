package com.cosmic.tracker.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/me")
public class ProfileController {


    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getMyProfile(Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(new ProfileDTO(user.getId(), user.getUsername()));
    }

    @PutMapping
    public ResponseEntity<?> updateMyProfile(@RequestBody ProfileDTO profileDTO, Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        // ✅ Update username (check if it's changing)
        if (profileDTO.getUsername() != null && !profileDTO.getUsername().equals(user.getUsername())) {
            // Optional: check if new username already exists
            if (userRepository.findByUsername(profileDTO.getUsername()) != null) {
                return ResponseEntity.badRequest().body("Username already taken");
            }
            user.setUsername(profileDTO.getUsername());
        }

        // ✅ Update email
        if (profileDTO.getEmail() != null) {
            user.setEmail(profileDTO.getEmail());
        }

        // ✅ Update password (if provided)
        if (profileDTO.getPassword() != null && !profileDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(profileDTO.getPassword()));
        }
        

        userRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully");
    }
    // TODO: adding the update profile feature later ( LMAO I dont feel like it 3ndna more priorities to work on)
}
