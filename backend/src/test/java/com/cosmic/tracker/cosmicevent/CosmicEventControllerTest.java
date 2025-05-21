package com.cosmic.tracker.cosmicevent;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class CosmicEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CosmicEventRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll(); // we make sure the DB is empty before running tests

        CosmicEvent event1 = new CosmicEvent();
        event1.setTitle("Test Event");
        event1.setEventDate(LocalDate.of(2025, 1, 1));
        event1.setType("Generic");

        CosmicEvent event2 = new CosmicEvent();
        event2.setTitle("Meteor Shower");
        event2.setEventDate(LocalDate.now().plusDays(5));
        event2.setType("Meteor Shower");

        repository.saveAll(List.of(event1, event2));
    }

    @Test
    void testGetAllEvents() throws Exception {
        // When - a GET request is made to retrieve all events from db
        // Then
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Event"));
    }

    @Test
    void testGetEventsByType() throws Exception {
        // When - a GET request is made to retrieve a specific type of events
        // Then 
        mockMvc.perform(get("/api/events").param("type", "Meteor Shower"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].type").value("Meteor Shower"));
    }

    @Test
    void testGetUpcomingEvents() throws Exception {
        // When - a GET request is made to retrieve upcoming events today
        // Then
        mockMvc.perform(get("/api/events").param("fromToday", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Meteor Shower"));
    }
}
