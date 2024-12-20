package com.hotel.hb_backend.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private List<AmenityDTO> amenities;
    private List<Long> amenityIds;
    private List<PhotoDTO> photos;
}

