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
    private IRoomService roomService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {

        Response response = new Response();

        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Дата заезда должна быть после перед датой выезда");
            }
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MessException("Номер не найден"));
            User user = userRepository.findById(userId).orElseThrow(() -> new MessException("Пользователь не найден"));

            List<Booking> existingBookings = room.getBookings();

            if (!roomIsAvailable(bookingRequest, existingBookings)) {
                throw new MessException("Номер недоступен для выбранного диапазона дат");
            }

            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = ModelMapper.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);
            response.setStatusCode(200);
            response.setMessage("Номер успешно забронирован");
            response.setBookingConfirmationCode(bookingConfirmationCode);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при создании бронирования: " + e.getMessage());

        }
        return response;
    }


    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {

        Response response = new Response();

        try {
            Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new MessException("Booking Not Found"));
            BookingDTO bookingDTO = ModelMapper.mapBookingEntityToBookingDTOPlusBookedRooms(booking, true);
            response.setStatusCode(200);
            response.setMessage("с");
            response.setBooking(bookingDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при происке бронирования: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response getAllBookings() {

        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDTO> bookingDTOList = ModelMapper.mapBookingListEntityToBookingListDTO(bookingList);
            response.setStatusCode(200);
            response.setMessage("с");
            response.setBookingList(bookingDTOList);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении всех бронирований: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {

        Response response = new Response();

        try {
            bookingRepository.findById(bookingId).orElseThrow(() -> new MessException("Бронирование не существует"));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("с");

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при отмене бронирования: " + e.getMessage());

        }
        return response;
    }


    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {

        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }
}
