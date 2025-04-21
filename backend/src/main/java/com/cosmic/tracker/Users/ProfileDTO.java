package com.cosmic.tracker.Users;

public class ProfileDTO {
    private Long id;
    private String username;

    public ProfileDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    // TODO: Add setter later bach ndiro update
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
}
