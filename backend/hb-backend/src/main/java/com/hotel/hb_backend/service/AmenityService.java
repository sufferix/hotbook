package com.hotel.hb_backend.service;

import com.hotel.hb_backend.repository.AmenityRepository;
import com.hotel.hb_backend.serviceinterface.IAmenityService;
import com.hotel.hb_backend.dto.AmenityDTO;
import com.hotel.hb_backend.dto.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenityService implements IAmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    @Override
    public List<AmenityDTO> getAllAmenities() {
        return ModelMapper.mapAmenityListToDTO(amenityRepository.findAll());
    }
}
