package com.hotel.hb_backend.ServiceInterface;

import com.hotel.hb_backend.dto.LoginRequest;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
    Response blockUser(String userId, boolean enable);
}
