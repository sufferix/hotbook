package com.hotel.hb_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Override
    public String toString() {
        return "Amenity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
