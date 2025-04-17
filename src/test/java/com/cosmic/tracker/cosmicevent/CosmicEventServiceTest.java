package com.cosmic.tracker.cosmicevent;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CosmicEventServiceTest {

    private CosmicEventRepository repository;
    private CosmicEventService service;

    @BeforeEach
    void setUp() {
        repository = Mockito.mock(CosmicEventRepository.class);
        service = new CosmicEventService(repository);
    }

    @Test
    void testSaveEvent() {
        // given
        CosmicEvent event = new CosmicEvent();
        event.setTitle("Test Event");
        event.setEventDate(LocalDate.now());

        when(repository.save(event)).thenReturn(event);

        // when
        CosmicEvent saved = service.saveEvent(event);

        // then
        assertNotNull(saved);
        assertEquals("Test Event", saved.getTitle());
        verify(repository, times(1)).save(event);
    }

    @Test
    void testGetAllEvents() {
        // given
        CosmicEvent e1 = new CosmicEvent();
        CosmicEvent e2 = new CosmicEvent();
        when(repository.findAll()).thenReturn(Arrays.asList(e1, e2));

        // when
        List<CosmicEvent> all = service.getAllEvents();

        // then
        assertEquals(2, all.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testGetUpcomingEvents() {
        // given
        CosmicEvent futureEvent = new CosmicEvent();
        futureEvent.setEventDate(LocalDate.now().plusDays(5));

        when(repository.findByEventDateAfter(LocalDate.now()))
                .thenReturn(Collections.singletonList(futureEvent));

        // when
        List<CosmicEvent> upcoming = service.getUpcomingEvents();

        // then
        assertEquals(1, upcoming.size());
        assertTrue(upcoming.get(0).getEventDate().isAfter(LocalDate.now()));
    }

    @Test
    void testGetByType() {
        // given
        CosmicEvent meteor = new CosmicEvent();
        meteor.setType("Meteor Shower");

        when(repository.findByType("Meteor Shower"))
                .thenReturn(Collections.singletonList(meteor));

        // when
        List<CosmicEvent> result = service.getEventsByType("Meteor Shower");

        // then
        assertEquals(1, result.size());
        assertEquals("Meteor Shower", result.get(0).getType());
    }
}
