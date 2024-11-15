package com.hotel.hb_backend.Repository;

import com.hotel.hb_backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query("SELECT h FROM Hotel h WHERE h.city = :city AND EXISTS (" +
            "SELECT r FROM Room r WHERE r.hotel = h AND r.id NOT IN (" +
            "SELECT b.room.id FROM Booking b WHERE (b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)" +
            "))")
    List<Hotel> findAvailableHotelsByCityAndDates(String city, LocalDate checkInDate, LocalDate checkOutDate);
}
