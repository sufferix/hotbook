package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    List<Amenity> findAllById(Iterable<Long> ids);
}