package com.hotel.hb_backend.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.hotel.hb_backend.entity.Role;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;
    private String message;

    private String token;
    private Role role;
    private String expirationTime;
    private String bookingConfirmationCode;
    private HotelDTO hotel;
    private UserDTO user;
    private RoomDTO room;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<BookingDTO> bookingList;
    private List<HotelDTO> hotelList;
    private ApplicationFormDTO applicationForm;
    private List<ApplicationFormDTO> applicationFormList;
}
