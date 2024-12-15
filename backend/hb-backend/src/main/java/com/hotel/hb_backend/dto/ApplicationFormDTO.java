package com.hotel.hb_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationFormDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String city;
    private String address;
    private String hotelName;
    private Boolean processed;
}
