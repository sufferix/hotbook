package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();


    @Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.id NOT IN (SELECT bk.room.id FROM Booking bk WHERE" +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRoomsByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);


    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAllAvailableRooms();

    List<Room> findByHotelId(Long hotelId);
    Optional<Room> findByIdAndHotelId(Long roomId, Long hotelId);
}
