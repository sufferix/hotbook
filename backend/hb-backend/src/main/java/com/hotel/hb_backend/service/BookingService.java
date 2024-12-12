package com.hotel.hb_backend.service;

import com.hotel.hb_backend.dto.BookingDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.ServiceInterface.IRoomService;
import com.hotel.hb_backend.Repository.BookingRepository;
import com.hotel.hb_backend.Repository.RoomRepository;
import com.hotel.hb_backend.Repository.UserRepository;
import com.hotel.hb_backend.Config.ModelMapper;
import com.hotel.hb_backend.ServiceInterface.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Response createBooking(Long hotelId, Long roomId, String email, Booking bookingRequest) {
        Response response = new Response();
        try {
            // Проверка существования пользователя
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            // Проверка существования номера
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            // Проверка пересечений дат
            boolean hasConflicts = bookingRepository.existsByRoomAndDateRange(
                    room,
                    bookingRequest.getCheckInDate(),
                    bookingRequest.getCheckOutDate()
            );
            if (hasConflicts) {
                throw new MessException("Номер недоступен для бронирования на указанные даты");
            }

            // Создание нового бронирования
            Booking booking = new Booking();
            booking.setRoom(room);
            booking.setUser(user);
            booking.setCheckInDate(bookingRequest.getCheckInDate());
            booking.setCheckOutDate(bookingRequest.getCheckOutDate());
            booking.setNumOfAdults(bookingRequest.getNumOfAdults());
            booking.setNumOfChildren(bookingRequest.getNumOfChildren());

            bookingRepository.save(booking);

            response.setStatusCode(201);
            response.setMessage("Бронирование успешно создано");
        } catch (MessException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при создании бронирования: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyBookings(String email) {
        Response response = new Response();
        try {
            // Получение пользователя
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            // Получение списка бронирований
            List<Booking> bookings = bookingRepository.findByUser(user);
            List<BookingDTO> bookingDTOs = ModelMapper.mapBookingListEntityToBookingListDTO(bookings);

            response.setStatusCode(200);
            response.setMessage("Список бронирований успешно получен");
            response.setBookingList(bookingDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка бронирований: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId, String email) {
        Response response = new Response();
        try {
            // Проверка существования бронирования
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new MessException("Бронирование не найдено"));

            // Проверка принадлежности бронирования пользователю
            if (!booking.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете отменить это бронирование");
            }

            // Удаление бронирования
            bookingRepository.delete(booking);

            response.setStatusCode(200);
            response.setMessage("Бронирование успешно отменено");
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при отмене бронирования: " + e.getMessage());
        }
        return response;
    }
}


