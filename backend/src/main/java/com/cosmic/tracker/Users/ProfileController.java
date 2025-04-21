package com.cosmic.tracker.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/me")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getMyProfile(Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(new ProfileDTO(user.getId(), user.getUsername()));
    }
    // TODO: adding the update profile feature later ( LMAO I dont feel like it 3ndna more priorities to work on)
}
