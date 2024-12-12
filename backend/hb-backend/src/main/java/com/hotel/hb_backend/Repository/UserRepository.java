package com.hotel.hb_backend.Repository;

import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
