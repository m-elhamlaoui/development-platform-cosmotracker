package com.cosmic.tracker.cosmicevent;

import org.springframework.web.bind.annotation.*;
import com.cosmic.tracker.cosmicevent.CosmicEvent;
import com.cosmic.tracker.cosmicevent.CosmicEventRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class CosmicEventController {

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
            @RequestParam(required = false, defaultValue = "false") boolean fromToday
    ) {
        if (type != null) {
            return service.getEventsByType(type);
        }

        if (constellation != null) {
            return service.getEventsByConstellation(constellation);
        }

        if (start != null && end != null) {
            return service.getEventsBetween(LocalDate.parse(start), LocalDate.parse(end));
        }

        if (fromToday) {
            return service.getUpcomingEvents();
        }

        return service.getAllEvents();
    }

    @PostMapping
    public CosmicEvent create(@RequestBody CosmicEvent event) {
        return service.saveEvent(event);
    }
}