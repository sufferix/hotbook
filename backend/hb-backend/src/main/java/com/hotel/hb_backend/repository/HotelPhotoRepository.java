package com.hotel.hb_backend.repository;
import com.hotel.hb_backend.entity.HotelPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelPhotoRepository extends JpaRepository<HotelPhoto, Long> {
    List<HotelPhoto> findByHotelId(Long hotelId); // Получение всех фото отеля
}
