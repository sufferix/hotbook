package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long>, JpaSpecificationExecutor<Hotel> {
    @Query("SELECT DISTINCT h.city FROM Hotel h")
    List<String> findAllDistinctCities();
    List<Hotel> findByUser(User user);
}
