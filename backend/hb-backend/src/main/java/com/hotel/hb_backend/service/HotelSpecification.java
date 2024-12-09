package com.hotel.hb_backend.service;

import com.hotel.hb_backend.entity.Booking;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Room;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class HotelSpecification {

    public static Specification<Hotel> withFilters(String city, Integer stars, String roomType,
                                                   LocalDate checkInDate, LocalDate checkOutDate) {
        return (root, query, cb) -> {
            query.distinct(true);
            Join<Hotel, Room> roomJoin = root.join("rooms", JoinType.LEFT);

            Predicate criteria = cb.conjunction();

            // Фильтр по городу
            if (city != null && !city.isBlank()) {
                criteria = cb.and(criteria, cb.equal(root.get("city"), city));
            }

            // Фильтр по звездам
            if (stars != null) {
                criteria = cb.and(criteria, cb.equal(root.get("stars"), Integer.valueOf(stars)));
            }


            // Фильтр по типу комнаты
            if (roomType != null && !roomType.isBlank()) {
                criteria = cb.and(criteria, cb.equal(roomJoin.get("roomType"), roomType));
            }

            // Фильтр по доступности номеров
            if (checkInDate != null && checkOutDate != null) {
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Booking> bookingRoot = subquery.from(Booking.class);
                subquery.select(bookingRoot.get("room").get("id"))
                        .where(
                                cb.and(
                                        cb.lessThanOrEqualTo(bookingRoot.get("checkInDate"), checkOutDate), // Начало бронирования <= конец нового периода
                                        cb.greaterThanOrEqualTo(bookingRoot.get("checkOutDate"), checkInDate) // Конец бронирования >= начало нового периода
                                )
                        );

                // Исключаем комнаты, занятые в указанный период
                criteria = cb.and(criteria, cb.not(roomJoin.get("id").in(subquery)));
            }

            return criteria;
        };
    }

}
