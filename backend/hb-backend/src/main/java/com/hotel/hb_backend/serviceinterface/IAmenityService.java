package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.AmenityDTO;

import java.util.List;

public interface IAmenityService {
    List<AmenityDTO> getAllAmenities();
}

