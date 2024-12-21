package com.hotel.hb_backend.service;

import com.hotel.hb_backend.repository.AmenityRepository;
import com.hotel.hb_backend.serviceinterface.IAmenityService;
import com.hotel.hb_backend.dto.AmenityDTO;
import com.hotel.hb_backend.dto.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenityService implements IAmenityService {

    private final AmenityRepository amenityRepository;

    public AmenityService(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @Override
    public List<AmenityDTO> getAllAmenities() {
        return ModelMapper.mapAmenityListToDTO(amenityRepository.findAll());
    }
}
