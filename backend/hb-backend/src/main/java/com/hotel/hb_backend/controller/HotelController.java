package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.ServiceInterface.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewHotel(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "stars", required = false) Integer stars
    ) {
        if (name == null || name.isBlank() || city == null || city.isBlank() || stars == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Необходимо указать все обязательные поля: имя, город, звезды");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = hotelService.addHotel(name, city, description, stars);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllHotels() {
        Response response = hotelService.getAllHotels();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Response> getHotelById(@PathVariable Long hotelId) {
        Response response = hotelService.getHotelById(hotelId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{hotelId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateHotel(
            @PathVariable Long hotelId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "stars", required = false) Integer stars
    ) {
        if (name == null || name.isBlank() || city == null || city.isBlank() || stars == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Необходимо указать все обязательные поля: имя, город, звезды");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = hotelService.updateHotel(hotelId, name, city, description, stars);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{hotelId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteHotel(@PathVariable Long hotelId) {
        Response response = hotelService.deleteHotel(hotelId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @GetMapping("/filter")
    public ResponseEntity<Response> getFilteredHotels(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) Integer stars
    ) {
        Response response = hotelService.findHotelsWithAvailableRoomsByFilters(checkInDate, checkOutDate, roomType, city, stars);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}


