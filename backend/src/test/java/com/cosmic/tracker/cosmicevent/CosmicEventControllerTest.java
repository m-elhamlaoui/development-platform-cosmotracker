package com.cosmic.tracker.cosmicevent;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CosmicEventController.class)
@Import(TestSecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
public class CosmicEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CosmicEventService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllEvents() throws Exception {
        // given
        CosmicEvent event = new CosmicEvent();
        event.setTitle("Test Event");
        event.setEventDate(LocalDate.of(2025, 1, 1));

        when(service.getAllEvents()).thenReturn(List.of(event));

        // when & then
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Event"));
    }

    @Test
    void testGetEventsByType() throws Exception {
        // given
        CosmicEvent event = new CosmicEvent();
        event.setTitle("Meteor Shower");
        event.setType("Meteor Shower");

        when(service.getEventsByType("Meteor Shower")).thenReturn(List.of(event));

        // when & then
        mockMvc.perform(get("/api/events")
                        .param("type", "Meteor Shower")) // only this param!
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].type").value("Meteor Shower"));
    }

    @Test
    void testGetUpcomingEvents() throws Exception {
        // given
        CosmicEvent event = new CosmicEvent();
        event.setTitle("Future Event");
        event.setEventDate(LocalDate.now().plusDays(10));

        when(service.getUpcomingEvents()).thenReturn(List.of(event));

        // when & then
        mockMvc.perform(get("/api/events")
                        .param("fromToday", "true")) // only this param!
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Future Event"));
    }

    @Test
    void testCreateEvent() throws Exception {
        // given
        CosmicEvent newEvent = new CosmicEvent();
        newEvent.setTitle("New Event");
        newEvent.setEventDate(LocalDate.of(2025, 1, 15));
        newEvent.setType("Full Moon");

        when(service.saveEvent(any(CosmicEvent.class))).thenReturn(newEvent);

        // when & then
        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newEvent)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Event"))
                .andExpect(jsonPath("$.type").value("Full Moon"));
    }
}
