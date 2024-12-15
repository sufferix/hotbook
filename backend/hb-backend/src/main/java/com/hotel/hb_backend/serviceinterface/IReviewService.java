package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.ReviewDTO;

import java.util.List;

public interface IReviewService {
    List<ReviewDTO> getReviewsForHotel(Long hotelId);

    Response addReviewToHotel(Long hotelId, String email, ReviewDTO reviewDTO);
}
