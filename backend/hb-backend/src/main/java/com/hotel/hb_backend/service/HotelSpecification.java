package com.hotel.hb_backend.service;

import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Room;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class HotelSpecification {

    public static Specification<Hotel> withFilters(String city, List<Integer> stars, String roomType,
                                                   List<Long> amenities, LocalDate checkInDate, LocalDate checkOutDate) {
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Hotel, Room> roomJoin = root.join("rooms", JoinType.LEFT);
            Join<Room, ?> amenityJoin = null;

            if (amenities != null && !amenities.isEmpty()) {
                amenityJoin = roomJoin.join("amenities", JoinType.LEFT);
            }

            Predicate criteria = cb.conjunction();

            if (city != null && !city.isBlank()) {
                criteria = cb.and(criteria, cb.equal(root.get("city"), city));
            }
            if (stars != null && !stars.isEmpty()) {
                criteria = cb.and(criteria, root.get("stars").in(stars));
            }
            if (roomType != null && !roomType.isBlank()) {
                criteria = cb.and(criteria, cb.equal(roomJoin.get("roomType"), roomType));
            }
            if (amenities != null && !amenities.isEmpty()) {
                criteria = cb.and(criteria, amenityJoin.get("id").in(amenities));
            }
            if (checkInDate != null && checkOutDate != null) {
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Booking> bookingRoot = subquery.from(Booking.class);
                subquery.select(bookingRoot.get("room").get("id"))
                        .where(
                                cb.and(
                                        cb.lessThanOrEqualTo(bookingRoot.get("checkInDate"), checkOutDate),
                                        cb.greaterThanOrEqualTo(bookingRoot.get("checkOutDate"), checkInDate)
                                )
                        );
                criteria = cb.and(criteria, cb.not(roomJoin.get("id").in(subquery)));
            }
            return criteria;
        };
    }

}
