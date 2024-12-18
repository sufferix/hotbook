package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.HotelDTO;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface IHotelService {
    Response filterHotels(String city, List<Integer> stars, String roomType,
                          List<Long> amenities, LocalDate checkInDate, LocalDate checkOutDate);
    Response addHotelPhotos(Long hotelId, String email, List<MultipartFile> files);

    Response deleteHotelPhoto(Long hotelId, Long photoId, String email);

    Response getAllHotels();

    Response getHotelByIdWithFilters(Long hotelId, LocalDate checkInDate, LocalDate checkOutDate, List<Long> amenities);

    Response getHotelByIdWithoutFilters(Long hotelId);

    Response addHotel(HotelDTO hotelDTO, String email);

    Response updateHotel(Long hotelId, HotelDTO hotelDTO, String email);

    Response deleteHotel(Long hotelId, String email);

    Response getAllCities();

}
