package com.hotel.hb_backend.service;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;
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
    private BookingRepository bookingRepository;

    @Override
    public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();

        try {
            Room room = new Room();
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);
            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = ModelMapper.mapRoomEntityToRoomDTO(savedRoom);
            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoom(roomDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTOList = ModelMapper.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoomList(roomDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();

        try {
            roomRepository.findById(roomId).orElseThrow(() -> new MessException("Комната не найдена"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("Успешно");

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        Response response = new Response();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MessException("Комната не найдена"));
            if (roomType != null) room.setRoomType(roomType);
            if (roomPrice != null) room.setRoomPrice(roomPrice);
            if (description != null) room.setRoomDescription(description);

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = ModelMapper.mapRoomEntityToRoomDTO(updatedRoom);

            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoom(roomDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MessException("Комната не найдена"));
            RoomDTO roomDTO = ModelMapper.mapRoomEntityToRoomDTOPlusBookings(room);
            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoom(roomDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();

        try {
            List<Room> availableRooms = roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate, roomType);
            List<RoomDTO> roomDTOList = ModelMapper.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoomList(roomDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.getAllAvailableRooms();
            List<RoomDTO> roomDTOList = ModelMapper.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("Успешно");
            response.setRoomList(roomDTOList);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при сохранении комнаты: " + e.getMessage());
        }
        return response;
    }
}
