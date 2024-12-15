package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.serviceinterface.IRoomService;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.RoomDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/hotels/{hotelId}/rooms")
public class RoomController {

    @Autowired
    private IRoomService roomService;

    // Получение всех номеров конкретного отеля (доступно для всех)
    @GetMapping
    public ResponseEntity<Response> getRoomsByHotelId(@PathVariable Long hotelId) {
        Response response = roomService.getRoomsByHotelId(hotelId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Добавление нового номера в отель (только для владельца)
    @PostMapping
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> addRoomToHotel(
            @PathVariable Long hotelId,
            @RequestBody RoomDTO roomDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = roomService.addRoomToHotel(hotelId, roomDTO, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Обновление информации о номере (только для владельца)
    @PutMapping("/{roomId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> updateRoom(
            @PathVariable Long hotelId,
            @PathVariable Long roomId,
            @RequestBody RoomDTO roomDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = roomService.updateRoom(hotelId, roomId, roomDTO, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Удаление номера (только для владельца)
    @DeleteMapping("/{roomId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> deleteRoom(
            @PathVariable Long hotelId,
            @PathVariable Long roomId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = roomService.deleteRoom(hotelId, roomId, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{roomId}/photos")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> uploadRoomPhotos(
            @PathVariable Long hotelId,
            @PathVariable Long roomId,
            @RequestParam("files") List<MultipartFile> files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = roomService.addRoomPhotos(hotelId, roomId, email, files);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{roomId}/photos/{photoId}")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> deleteRoomPhoto(
            @PathVariable Long hotelId,
            @PathVariable Long roomId,
            @PathVariable Long photoId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = roomService.deleteRoomPhoto(hotelId, roomId, photoId, email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}

