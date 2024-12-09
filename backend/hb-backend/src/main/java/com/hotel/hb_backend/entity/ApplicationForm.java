package com.hotel.hb_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Entity
@Data
@Table(name = "application_forms")
public class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    private String fullName; // ФИО

    @NotNull
    private String email;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String city;

    @NotNull
    private String address;

    @NotNull
    private String hotelName;

    private boolean processed = false; // Флаг, обработана ли заявка
}
