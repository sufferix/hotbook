package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.Response;

import java.time.LocalDate;

public interface IHotelService {
    Response addHotel(String name, String city, String description, int stars);
    Response getAllHotels();
    Response getHotelById(Long hotelId);
    Response updateHotel(Long hotelId, String name, String city, String description, int stars);
    Response deleteHotel(Long hotelId);
    Response findHotelsWithAvailableRoomsByFilters(LocalDate checkInDate, LocalDate checkOutDate, String roomType, String city, int stars);
}
