package com.cosmic.tracker.cosmicevent;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CosmicEventController.class)
@Import(TestSecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
public class CosmicEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // TODO: remove the MockBean annotation and replace it with MockitoBean instead
    @MockBean
    private CosmicEventService service;

    @Autowired
    private ObjectMapper objectMapper;

    //TODO: remove AutoConfigureMockMvc and add MockUser for each test instead
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

}
