package com.hotel.hb_backend.serviceinterface;

import com.hotel.hb_backend.dto.LoginRequest;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.UserDTO;
import com.hotel.hb_backend.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserById(Long userId);

    Response deleteUser(Long userId);

    Response getProfile(String email);

    Response blockUser(Long userId, boolean enable);

    Response updateUserProfile(String email, UserDTO userDTO);
    Response getHotelsOfLoggedInHotelier(String email);
}