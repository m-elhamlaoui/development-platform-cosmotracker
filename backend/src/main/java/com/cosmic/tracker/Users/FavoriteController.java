package com.cosmic.tracker.Users;

import com.cosmic.tracker.cosmicevent.CosmicEvent;
import com.cosmic.tracker.cosmicevent.CosmicEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private CosmicEventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{eventId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long eventId, Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());
        CosmicEvent event = eventRepository.findById(eventId).orElse(null);

        if (event == null) return ResponseEntity.notFound().build();
        if (favoriteRepository.existsByUserAndEvent(user, event)) return ResponseEntity.ok("Already added");

        favoriteRepository.save(new Favorite(user, event));
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long eventId, Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());
        CosmicEvent event = eventRepository.findById(eventId).orElse(null);

        if (event == null) return ResponseEntity.notFound().build();

        favoriteRepository.deleteByUserAndEvent(user, event);
        return ResponseEntity.ok("Removed from favorites");
    }

    @GetMapping
    public List<CosmicEvent> getFavorites(Authentication auth) {
        MyUser user = userRepository.findByUsername(auth.getName());
        return favoriteRepository.findByUser(user).stream()
                .map(Favorite::getEvent)
                .toList();
    }
}
