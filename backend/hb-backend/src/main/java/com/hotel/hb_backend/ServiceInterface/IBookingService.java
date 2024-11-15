package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}
