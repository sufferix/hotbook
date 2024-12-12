package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Booking;

public interface IBookingService {
    Response createBooking(Long hotelId, Long roomId, String email, Booking bookingRequest);

    Response getMyBookings(String email);

    Response cancelBooking(Long bookingId, String email);
}

