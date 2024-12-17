package com.hotel.hb_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "room_photos")
public class RoomPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String photoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Override
    public String toString() {
        return "RoomPhoto{" +
                "id=" + id +
                ", photo='" + photoUrl + '\'' +
                '}';
    }
}
