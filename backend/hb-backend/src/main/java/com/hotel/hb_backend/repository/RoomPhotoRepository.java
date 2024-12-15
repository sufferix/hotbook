package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.RoomPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomPhotoRepository extends JpaRepository<RoomPhoto, Long> {
    List<RoomPhoto> findByRoomId(Long roomId); // Получение всех фото номера
}
