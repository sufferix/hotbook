package com.hotel.hb_backend.Repository;

import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long>, JpaSpecificationExecutor<Hotel> {

    @Query("SELECT h FROM Hotel h WHERE h.city = :city AND h.stars = :stars AND EXISTS (" +
            "SELECT r FROM Room r WHERE r.hotel = h AND r.roomType  = :roomType AND r.id NOT IN (" +
            "SELECT b.room.id FROM Booking b WHERE (b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)" +
            "))")
    List<Hotel> findHotelsWithAvailableRoomsByFilters(@Param("checkInDate") LocalDate checkInDate,
                                                      @Param("checkOutDate") LocalDate checkOutDate,
                                                      @Param("city") String city,
                                                      @Param("roomType") String roomType,
                                                      @Param("stars") int stars);
    @Query("SELECT h FROM Hotel h WHERE h.city = :city AND h.stars = :stars AND EXISTS (" +
            "SELECT r FROM Room r WHERE r.hotel = h AND r.roomType = :roomType AND NOT EXISTS (" +
            "SELECT b FROM Booking b WHERE b.room = r AND b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate" +
            "))")
    List<Hotel> testSimpleQuery(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("city") String city,
            @Param("roomType") String roomType,
            @Param("stars") int stars);
}
