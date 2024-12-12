package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.HotelDTO;

import java.time.LocalDate;

public interface IHotelService {

    Response getAllHotels();

    Response getHotelById(Long hotelId);

    Response addHotel(HotelDTO hotelDTO, String email);

    Response updateHotel(Long hotelId, HotelDTO hotelDTO, String email);

    Response deleteHotel(Long hotelId, String email);

}
