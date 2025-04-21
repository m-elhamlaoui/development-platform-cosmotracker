package com.cosmic.tracker.cosmicevent;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader {

    @Autowired
    private CosmicEventRepository repository;

    @PostConstruct
    public void loadDataOnce() {
        try {
            if (repository.count() == 0) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

                InputStream inputStream = new ClassPathResource("cosmic_events_sample.json").getInputStream();
                List<CosmicEvent> events = mapper.readValue(inputStream, new TypeReference<>() {});
                repository.saveAll(events);

                System.out.println("✔ Loaded initial cosmic events into DB.");
            } else {
                System.out.println("ℹ️ DB already contains events, skipping initial load.");
            }
        } catch (Exception e) {
            System.err.println("❌ Error loading cosmic events: " + e.getMessage());
        }
    }
}
