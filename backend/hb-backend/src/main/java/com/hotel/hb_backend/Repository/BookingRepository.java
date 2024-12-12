package com.hotel.hb_backend.Repository;

import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Проверка пересечений по датам
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END " +
            "FROM Booking b WHERE b.room = :room " +
            "AND b.checkInDate < :checkOutDate " +
            "AND b.checkOutDate > :checkInDate")
    boolean existsByRoomAndDateRange(
            @Param("room") Room room,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);

    // Получение всех бронирований пользователя
    List<Booking> findByUser(User user);
}

