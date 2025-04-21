package com.cosmic.tracker.Users;

import com.cosmic.tracker.cosmicevent.CosmicEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(MyUser user);
    boolean existsByUserAndEvent(MyUser user, CosmicEvent event);
    void deleteByUserAndEvent(MyUser user, CosmicEvent event);
}
