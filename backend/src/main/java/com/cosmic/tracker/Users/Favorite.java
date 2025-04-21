package com.cosmic.tracker.Users;

import com.cosmic.tracker.cosmicevent.CosmicEvent;
import jakarta.persistence.*;

@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private MyUser user;

    @ManyToOne
    private CosmicEvent event;

    public Favorite() {}

    public Favorite(MyUser user, CosmicEvent event) {
        this.user = user;
        this.event = event;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public MyUser getUser() { return user; }
    public void setUser(MyUser user) { this.user = user; }

    public CosmicEvent getEvent() { return event; }
    public void setEvent(CosmicEvent event) { this.event = event; }
}
