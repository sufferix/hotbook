package com.hotel.hb_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HotelDTO {
    private Long id;
    private String name;
    private String city;
    private String address;
    private String description;
    private int stars;
    private List<RoomDTO> rooms;
    private List<String> photos;
}

