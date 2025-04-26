package com.cosmic.tracker.cosmicevent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class CosmicEventController {
    @Autowired
    private final CosmicEventService service;

    public CosmicEventController(CosmicEventService service) {
        this.service = service;
    }

    @GetMapping
    public List<CosmicEvent> getFilteredEvents(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String constellation,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(required = false) String month,
            @RequestParam(required = false, defaultValue = "false") boolean fromToday
    ) {
        if (type != null) {
            return service.getEventsByType(type);
        }

        if (constellation != null) {
            return service.getEventsByConstellation(constellation);
        }

        if (month != null) {
            int monthNumber = getMonthNumber(month);
            return service.getEventsByMonth(monthNumber);
        }

        if (start != null && end != null) {
            return service.getEventsBetween(LocalDate.parse(start), LocalDate.parse(end));
        }

        if (fromToday) {
            return service.getUpcomingEvents();
        }

        return service.getAllEvents();
    }

    private int getMonthNumber(String monthName) {
        return java.time.Month.valueOf(monthName.toUpperCase()).getValue();
    }

    @PostMapping
    public CosmicEvent create(@RequestBody CosmicEvent event) {
        return service.saveEvent(event);
    }

    @GetMapping("/upcoming-this-month")
    public List<CosmicEvent> getUpcomingThisMonth() {
        return service.getUpcomingEventsThisMonth();
    }

    @GetMapping("/{id}")
    public CosmicEvent getEventById(@PathVariable Long id) {
        return service.getEventById(id);
    }
}