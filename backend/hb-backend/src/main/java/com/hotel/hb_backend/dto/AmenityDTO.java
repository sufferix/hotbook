package com.hotel.hb_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AmenityDTO {
    private Long id;
    private String name;
}
