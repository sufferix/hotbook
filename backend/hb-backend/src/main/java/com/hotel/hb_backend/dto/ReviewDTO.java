package com.hotel.hb_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewDTO {

    private Long id;
    private int rating;
    private String content;
    private String userName;
    private Long hotelId;
}
