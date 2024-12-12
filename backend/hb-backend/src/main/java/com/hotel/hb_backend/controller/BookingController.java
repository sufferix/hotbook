package com.hotel.hb_backend.controller;


import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.ServiceInterface.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private IBookingService bookingService;

    // Создание бронирования
    @PostMapping("/hotels/{hotelId}/rooms/{roomId}/book")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Response> createBooking(
            @PathVariable Long hotelId,
            @PathVariable Long roomId,
            @RequestBody Booking bookingRequest
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = bookingService.createBooking(hotelId, roomId, email, bookingRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Получение всех бронирований текущего пользователя
    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Response> getMyBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = bookingService.getMyBookings(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Отмена бронирования текущего пользователя
    @DeleteMapping("/{bookingId}/cancel")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Response> cancelBooking(@PathVariable Long bookingId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = bookingService.cancelBooking(bookingId, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}



