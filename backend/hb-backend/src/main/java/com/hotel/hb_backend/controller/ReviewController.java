package com.hotel.hb_backend.controller;

import com.hotel.hb_backend.serviceinterface.IReviewService;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.ReviewDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels/{hotelId}/reviews")
public class ReviewController {

    private final IReviewService reviewService;

    public ReviewController(IReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Получение всех отзывов для отеля
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable Long hotelId) {
        List<ReviewDTO> reviews = reviewService.getReviewsForHotel(hotelId);
        return ResponseEntity.ok(reviews);
    }

    // Добавление нового отзыва для отеля
    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Response> addReview(
            @PathVariable Long hotelId,
            @RequestBody ReviewDTO reviewDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Response response = reviewService.addReviewToHotel(hotelId, email, reviewDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
