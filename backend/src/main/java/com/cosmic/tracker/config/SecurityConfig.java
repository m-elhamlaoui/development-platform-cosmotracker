package com.cosmic.tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // disable CSRF for testing
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // allow all endpoints
                )
                .httpBasic().disable() // disable HTTP Basic
                .formLogin().disable(); // disable login form

        return http.build();
    }
}
