package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.serviceinterface.IHotelService;
import com.hotel.hb_backend.dto.HotelDTO;
import com.hotel.hb_backend.dto.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

    @GetMapping("/cities")
    public ResponseEntity<Response> getAllCities() {
        Response response = hotelService.getAllCities();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    // Получение списка всех отелей
    @GetMapping
    public ResponseEntity<Response> getAllHotels() {
        Response response = hotelService.getAllHotels();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    //Получение подробной информации об отеле
// Получение отеля с фильтрацией по датам и удобствам
    @GetMapping("/{hotelId}")
    public ResponseEntity<Response> getHotelByIdWithFilters(
            @PathVariable Long hotelId,
            @RequestParam(required = false) String checkInDate,
            @RequestParam(required = false) String checkOutDate,
            @RequestParam(required = false) List<Long> amenities) {

        Response response;

        // Если даты не переданы, вызываем обычный метод
        if (checkInDate == null || checkOutDate == null) {
            response = hotelService.getHotelByIdWithoutFilters(hotelId);
        } else {
            response = hotelService.getHotelByIdWithFilters(
                    hotelId, LocalDate.parse(checkInDate), LocalDate.parse(checkOutDate), amenities);
        }

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



    @PostMapping
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> addHotel(@RequestBody HotelDTO hotelDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = hotelService.addHotel(hotelDTO, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @PutMapping("/{hotelId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> updateHotel(
            @PathVariable Long hotelId,
            @RequestBody HotelDTO hotelDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = hotelService.updateHotel(hotelId, hotelDTO, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{hotelId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> deleteHotel(@PathVariable Long hotelId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = hotelService.deleteHotel(hotelId, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{hotelId}/photos")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> uploadHotelPhotos(
            @PathVariable Long hotelId,
            @RequestParam("files") List<MultipartFile> files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = hotelService.addHotelPhotos(hotelId, email, files);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @DeleteMapping("/{hotelId}/photos/{photoId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> deleteHotelPhoto(
            @PathVariable Long hotelId,
            @PathVariable Long photoId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = hotelService.deleteHotelPhoto(hotelId, photoId, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/filter")
    public ResponseEntity<Response> filterHotels(
            @RequestParam String city,
            @RequestParam(required = false) List<Integer> stars,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) List<Long> amenities,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate) {

        Response response = hotelService.filterHotels(
                city, stars, roomType, amenities, LocalDate.parse(checkInDate), LocalDate.parse(checkOutDate));

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}
