package com.hotel.hb_backend.service;

import com.hotel.hb_backend.dto.HotelDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.Repository.HotelRepository;
import com.hotel.hb_backend.ServiceInterface.IHotelService;
import com.hotel.hb_backend.Config.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HotelService implements IHotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Response getAllHotels() {
        Response response = new Response();
        try {
            List<Hotel> hotels = hotelRepository.findAll();
            List<HotelDTO> hotelDTOList = ModelMapper.mapHotelListEntityToHotelListDTO(hotels);
            response.setStatusCode(200);
            response.setMessage("Список отелей успешно получен");
            response.setHotelList(hotelDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка отелей: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getHotelById(Long hotelId) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель с ID " + hotelId + " не найден"));
            HotelDTO hotelDTO = ModelMapper.mapHotelEntityToHotelDTO(hotel);
            response.setStatusCode(200);
            response.setMessage("Информация об отеле успешно получена");
            response.setHotel(hotelDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addHotel(String name, String city, String description, int stars) {
        Response response = new Response();
        try {
            Hotel hotel = new Hotel();
            hotel.setName(name);
            hotel.setCity(city);
            hotel.setDescription(description);
            hotel.setStars(stars);
            Hotel savedHotel = hotelRepository.save(hotel);
            HotelDTO hotelDTO = ModelMapper.mapHotelEntityToHotelDTO(savedHotel);
            response.setStatusCode(200);
            response.setMessage("Отель успешно добавлен");
            response.setHotel(hotelDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при добавлении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateHotel(Long hotelId, String name, String city, String description, int stars) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель с ID " + hotelId + " не найден"));
            hotel.setName(name);
            hotel.setCity(city);
            hotel.setDescription(description);
            hotel.setStars(stars);
            Hotel updatedHotel = hotelRepository.save(hotel);
            HotelDTO hotelDTO = ModelMapper.mapHotelEntityToHotelDTO(updatedHotel);
            response.setStatusCode(200);
            response.setMessage("Информация об отеле успешно обновлена");
            response.setHotel(hotelDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обновлении отеля: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteHotel(Long hotelId) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель с ID " + hotelId + " не найден"));
            hotelRepository.delete(hotel);
            response.setStatusCode(200);
            response.setMessage("Отель успешно удален");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении отеля: " + e.getMessage());
        }
        return response;
    }

    public Response findHotelsWithAvailableRoomsByFilters(LocalDate checkInDate, LocalDate checkOutDate, String roomType, String city, Integer  stars)  {
        Response response = new Response();
        try {
            Specification<Hotel> specification = HotelSpecification.withFilters(city, stars != null ? stars : null, roomType, checkInDate, checkOutDate);
            List<Hotel> hotels = hotelRepository.findAll(specification);
            List<HotelDTO> hotelDTOList = ModelMapper.mapHotelListEntityToHotelListDTO(hotels);

            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setHotelList(hotelDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при фильтрации отелей: " + e.getMessage());
        }
        return response;
    }
}


