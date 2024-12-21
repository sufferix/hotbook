package com.hotel.hb_backend.service;

import com.hotel.hb_backend.serviceinterface.IReviewService;
import com.hotel.hb_backend.dto.ModelMapper;
import com.hotel.hb_backend.repository.HotelRepository;
import com.hotel.hb_backend.repository.ReviewRepository;
import com.hotel.hb_backend.repository.UserRepository;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.ReviewDTO;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Review;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final HotelRepository hotelRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, HotelRepository hotelRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<ReviewDTO> getReviewsForHotel(Long hotelId) {
        List<Review> reviews = reviewRepository.findByHotelId(hotelId);
        return ModelMapper.mapReviewListToDTO(reviews);
    }


    public Response addReviewToHotel(Long hotelId, String email, ReviewDTO reviewDTO) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            Hotel hotel = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new MessException("Отель не найден"));

            Review review = new Review();
            review.setRating(reviewDTO.getRating());
            review.setContent(reviewDTO.getContent());
            review.setUser(user);
            review.setHotel(hotel);

            reviewRepository.save(review);

            response.setStatusCode(201);
            response.setMessage("Отзыв успешно добавлен");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при добавлении отзыва: " + e.getMessage());
        }
        return response;
    }
}

