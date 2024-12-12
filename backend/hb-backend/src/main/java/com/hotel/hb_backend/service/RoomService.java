package com.hotel.hb_backend.service;

import com.hotel.hb_backend.Repository.HotelRepository;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.ServiceInterface.IRoomService;
import com.hotel.hb_backend.Repository.BookingRepository;
import com.hotel.hb_backend.Repository.RoomRepository;
import com.hotel.hb_backend.Config.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService implements IRoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Response getRoomsByHotelId(Long hotelId) {
        Response response = new Response();
        try {
            List<Room> rooms = roomRepository.findByHotelId(hotelId);
            List<RoomDTO> roomDTOs = ModelMapper.mapRoomListEntityToRoomListDTO(rooms);

            response.setStatusCode(200);
            response.setMessage("Список номеров успешно получен");
            response.setRoomList(roomDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка номеров: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addRoomToHotel(Long hotelId, RoomDTO roomDTO, String email) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            if (!hotel.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого отеля");
            }

            Room room = new Room();
            room.setRoomType(roomDTO.getRoomType());
            room.setRoomPrice(roomDTO.getRoomPrice());
            room.setRoomDescription(roomDTO.getRoomDescription());
            room.setHotel(hotel);

            roomRepository.save(room);

            response.setStatusCode(201);
            response.setMessage("Номер успешно добавлен");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при добавлении номера: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long hotelId, Long roomId, RoomDTO roomDTO, String email) {
        Response response = new Response();
        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого номера");
            }

            room.setRoomType(roomDTO.getRoomType());
            room.setRoomPrice(roomDTO.getRoomPrice());
            room.setRoomDescription(roomDTO.getRoomDescription());

            roomRepository.save(room);

            response.setStatusCode(200);
            response.setMessage("Номер успешно обновлен");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обновлении номера: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long hotelId, Long roomId, String email) {
        Response response = new Response();
        try {
            Room room = roomRepository.findByIdAndHotelId(roomId, hotelId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            if (!room.getHotel().getUser().getEmail().equals(email)) {
                throw new MessException("Вы не являетесь владельцем этого номера");
            }

            roomRepository.delete(room);

            response.setStatusCode(200);
            response.setMessage("Номер успешно удален");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении номера: " + e.getMessage());
        }
        return response;
    }
}

