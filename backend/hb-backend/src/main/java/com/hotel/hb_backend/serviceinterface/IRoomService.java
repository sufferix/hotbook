package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRoomService {
    Response getRoomsByHotelId(Long hotelId);
    Response addRoomPhotos(Long hotelId, Long roomId, String email, List<MultipartFile> files);
    Response deleteRoomPhoto(Long hotelId, Long roomId, Long photoId, String email);
    Response addRoomToHotel(Long hotelId, RoomDTO roomDTO, String email);

    Response updateRoom(Long hotelId, Long roomId, RoomDTO roomDTO, String email);

    Response deleteRoom(Long hotelId, Long roomId, String email);
}


