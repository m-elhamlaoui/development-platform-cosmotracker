package com.cosmic.tracker.nasa;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@Service
public class NasaApodService {

    @Value("${nasa.apod.api.key}")
    private String apiKey;

    private final String API_URL = "https://api.nasa.gov/planetary/apod?api_key=";

    public String getAstronomyPictureOfTheDay() {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}

