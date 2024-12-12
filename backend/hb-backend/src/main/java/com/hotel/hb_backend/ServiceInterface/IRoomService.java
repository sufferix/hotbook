package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {
    Response getRoomsByHotelId(Long hotelId);

    Response addRoomToHotel(Long hotelId, RoomDTO roomDTO, String email);

    Response updateRoom(Long hotelId, Long roomId, RoomDTO roomDTO, String email);

    Response deleteRoom(Long hotelId, Long roomId, String email);
}


