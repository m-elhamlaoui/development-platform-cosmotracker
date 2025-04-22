package com.cosmic.tracker.cosmicevent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CosmicEventRepository extends JpaRepository<CosmicEvent, Long> {

    List<CosmicEvent> findByType(String type);

    List<CosmicEvent> findByConstellationsIgnoreCase(String constellation);

    List<CosmicEvent> findByEventDateBetween(LocalDate start, LocalDate end);

    List<CosmicEvent> findByEventDateAfter(LocalDate date);

    // Explicitly writing the query because hibernate for some reason is tweaking with postgres
    @Query(value = "SELECT * FROM cosmic_event WHERE EXTRACT(MONTH FROM event_date) = :month", nativeQuery = true)
    List<CosmicEvent> findByEventMonth(@Param("month") int month);

    // Another query to allow us to show all events that are upcoming this month
    @Query("SELECT e FROM CosmicEvent e WHERE MONTH(e.eventDate) = :month AND YEAR(e.eventDate) = :year AND e.eventDate >= :today")
    List<CosmicEvent> findUpcomingEventsThisMonth(@Param("month") int month,
                                                  @Param("year") int year,
                                                  @Param("today") LocalDate today);

}
