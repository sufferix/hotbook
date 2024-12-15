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

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

    // Получение списка всех отелей
    @GetMapping
    public ResponseEntity<Response> getAllHotels() {
        Response response = hotelService.getAllHotels();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    //Получение подробной информации об отеле
    @GetMapping("/{hotelId}")
    public ResponseEntity<Response> getHotelById(@PathVariable Long hotelId) {
        Response response = hotelService.getHotelById(hotelId);
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


}
