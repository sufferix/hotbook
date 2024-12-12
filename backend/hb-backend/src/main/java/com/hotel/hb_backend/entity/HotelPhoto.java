package com.hotel.hb_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hotel_photos")
public class HotelPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Override
    public String toString() {
        return "HotelPhoto{" +
                "id=" + id +
                ", photoUrl='" + photoUrl + '\'' +
                '}';
    }
}
