package com.cosmic.tracker.cosmicevent;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CosmicEventRepository extends JpaRepository<CosmicEvent, Long> {

    List<CosmicEvent> findByType(String type);

    List<CosmicEvent> findByEventDateBetween(LocalDate start, LocalDate end);

    List<CosmicEvent> findByEventDateAfter(LocalDate date);

    List<CosmicEvent> findByConstellationsIgnoreCase(String constellations);
}
