package com.cosmic.tracker.cosmicevent;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CosmicEventService {

    private final CosmicEventRepository repository;

    public CosmicEventService(CosmicEventRepository repository) {
        this.repository = repository;
    }

    public List<CosmicEvent> getAllEvents() {
        return repository.findAll();
    }

    public CosmicEvent saveEvent(CosmicEvent event) {
        return repository.save(event);
    }

    public List<CosmicEvent> getEventsByType(String type) {
        return repository.findByType(type);
    }

    public List<CosmicEvent> getEventsByConstellation(String constellation) {
        return repository.findByConstellationsIgnoreCase(constellation);
    }

    public List<CosmicEvent> getEventsBetween(LocalDate start, LocalDate end) {
        return repository.findByEventDateBetween(start, end);
    }

    public List<CosmicEvent> getUpcomingEvents() {
        return repository.findByEventDateAfter(LocalDate.now());
    }

    public List<CosmicEvent> getEventsByMonth(int month) {
        return repository.findByEventMonth(month);
    }

    public List<CosmicEvent> getUpcomingEventsThisMonth() {
        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int year = today.getYear();
        return repository.findUpcomingEventsThisMonth(month, year, today);
    }

    public CosmicEvent getEventById(Long id) {
        return repository.findById(id).orElse(null);
    }

}