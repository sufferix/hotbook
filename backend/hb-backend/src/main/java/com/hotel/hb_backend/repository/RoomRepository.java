package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    Optional<Room> findByIdAndHotelId(Long roomId, Long hotelId);

    @Query("SELECT r FROM Room r " +
            "LEFT JOIN r.bookings b " +
            "LEFT JOIN r.amenities a " +
            "WHERE r.hotel.id = :hotelId " +
            "AND (b.id IS NULL OR " +
            "     (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)) " +
            "AND (:amenityIds IS NULL OR a.id IN :amenityIds)")
    List<Room> findAvailableRoomsByHotelIdAndFilters(
            @Param("hotelId") Long hotelId,
            @Param("checkIn") LocalDate checkInDate,
            @Param("checkOut") LocalDate checkOutDate,
            @Param("amenityIds") List<Long> amenityIds);


    @Query("SELECT COUNT(r) > 0 FROM Room r " +
            "WHERE r.hotel.id = :hotelId " +
            "AND r.id NOT IN (SELECT b.room.id FROM Booking b " +
            "WHERE b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)")
    boolean hasAvailableRooms(@Param("hotelId") Long hotelId,
                              @Param("checkInDate") LocalDate checkInDate,
                              @Param("checkOutDate") LocalDate checkOutDate);


}
