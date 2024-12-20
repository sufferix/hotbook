package com.hotel.hb_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Дата заезда обязательна")
    private LocalDate checkInDate;

    @NotNull(message = "Дата выезда обязательна")
    private LocalDate checkOutDate;

    @Min(value = 1, message = "Количество взрослых не должно быть меньше 1")
    private int numOfAdults;

    @Min(value = 0, message = "Количество детей не может быть отрицательным")
    private int numOfChildren;

    private int totalNumOfGuest;

    @NotNull(message = "Полное имя обязательно")
    private String fullName; // Новое поле для полного имени

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    private BigDecimal totalCost;

    public void calculateTotalNumberOfGuest() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void calculateTotalCost() {
        if (this.checkInDate != null && this.checkOutDate != null && this.room != null) {
            long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(this.checkInDate, this.checkOutDate);
            if (daysBetween > 0) {
                this.totalCost = room.getRoomPrice().multiply(BigDecimal.valueOf(daysBetween));
            }
        }
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    @PrePersist
    @PreUpdate
    public void onPrePersistOrUpdate() {
        calculateTotalCost();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuest=" + totalNumOfGuest +
                ", fullName='" + fullName + '\'' +
                ", totalCost=" + totalCost +
                '}';
    }
}
