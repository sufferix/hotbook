package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.ServiceInterface.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

//req
}

