package com.hotel.hb_backend.service;
import com.hotel.hb_backend.dto.BookingDTO;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.entity.Room;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.repository.BookingRepository;
import com.hotel.hb_backend.repository.RoomRepository;
import com.hotel.hb_backend.repository.UserRepository;
import com.hotel.hb_backend.dto.ModelMapper;
import com.hotel.hb_backend.serviceinterface.IBookingService;
import org.springframework.stereotype.Service;
import java.util.List;
//
@Service
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;

    private final RoomRepository roomRepository;

    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Response createBooking(Long hotelId, Long roomId, String email, Booking bookingRequest) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new MessException("Номер не найден"));

            boolean hasConflicts = bookingRepository.existsByRoomAndDateRange(
                    room,
                    bookingRequest.getCheckInDate(),
                    bookingRequest.getCheckOutDate()
            );
            if (hasConflicts) {
                throw new MessException("Номер недоступен для бронирования на указанные даты");
            }

            Booking booking = new Booking();
            booking.setRoom(room);
            booking.setUser(user);
            booking.setCheckInDate(bookingRequest.getCheckInDate());
            booking.setCheckOutDate(bookingRequest.getCheckOutDate());
            booking.setNumOfAdults(bookingRequest.getNumOfAdults());
            booking.setNumOfChildren(bookingRequest.getNumOfChildren());
            booking.setFullName(bookingRequest.getFullName());

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
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь с email " + email + " не найден"));

            List<Booking> bookings = user.getBookings();
            List<BookingDTO> bookingDTOs = ModelMapper.mapBookingListEntityToBookingListDTO(bookings);

            response.setStatusCode(200);
            response.setMessage("История бронирований успешно получена");
            response.setBookingList(bookingDTOs);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении бронирований: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId, String email) {
        Response response = new Response();
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new MessException("Бронирование не найдено"));

            if (!booking.getUser().getEmail().equals(email)) {
                throw new MessException("Вы не можете отменить это бронирование");
            }

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


