package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.HotelDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IHotelService {

    Response addHotelPhotos(Long hotelId, String email, List<MultipartFile> files);
    Response deleteHotelPhoto(Long hotelId, Long photoId, String email);
    Response getAllHotels();

    Response getHotelById(Long hotelId);

    Response addHotel(HotelDTO hotelDTO, String email);

    Response updateHotel(Long hotelId, HotelDTO hotelDTO, String email);

    Response deleteHotel(Long hotelId, String email);

}
