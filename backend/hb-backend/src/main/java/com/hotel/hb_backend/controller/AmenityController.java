package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.ServiceInterface.IAmenityService;
import com.hotel.hb_backend.dto.AmenityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/amenities")
public class AmenityController {

    @Autowired
    private IAmenityService amenityService;

    // Получение списка всех удобств
    @GetMapping
    public ResponseEntity<List<AmenityDTO>> getAllAmenities() {
        List<AmenityDTO> amenities = amenityService.getAllAmenities();
        return ResponseEntity.ok(amenities);
    }
}
