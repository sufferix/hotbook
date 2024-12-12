package com.hotel.hb_backend.service;

import com.hotel.hb_backend.Repository.HotelRepository;
import com.hotel.hb_backend.dto.HotelDTO;
import com.hotel.hb_backend.dto.LoginRequest;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.UserDTO;
import com.hotel.hb_backend.entity.Hotel;
import com.hotel.hb_backend.entity.Role;
import com.hotel.hb_backend.entity.User;
import com.hotel.hb_backend.exception.MessException;
import com.hotel.hb_backend.ServiceInterface.IUserService;
import com.hotel.hb_backend.Repository.UserRepository;
import com.hotel.hb_backend.Config.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null) {
                user.setRole(Role.USER);
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new MessException("Пользователь с email " + user.getEmail() + " уже существует");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(201);
            response.setMessage("Пользователь успешно зарегистрирован");
            response.setUser(userDTO);
        } catch (MessException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при регистрации пользователя: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new MessException("Пользователь с email " + loginRequest.getEmail() + " не найден"));
            String token = jwtTokenService.generateToken(user);
            response.setStatusCode(200);
            response.setMessage("Успешный вход в систему");
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 дней");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при авторизации пользователя: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsers() {
        Response response = new Response();
        try {
            List<User> users = userRepository.findAll();
            List<UserDTO> userDTOList = ModelMapper.mapUserListEntityToUserListDTO(users);
            response.setStatusCode(200);
            response.setMessage("Список пользователей успешно получен");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка пользователей: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(Long userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new MessException("Пользователь с ID " + userId + " не найден"));
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Информация о пользователе успешно получена");
            response.setUser(userDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении информации о пользователе: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(Long userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new MessException("Пользователь с ID " + userId + " не найден"));
            userRepository.delete(user);
            response.setStatusCode(200);
            response.setMessage("Пользователь успешно удален");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при удалении пользователя: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь с email " + email + " не найден"));
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Информация о текущем пользователе успешно получена");
            response.setUser(userDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении информации о текущем пользователе: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь с email " + email + " не найден"));

            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);

            response.setStatusCode(200);
            response.setMessage("История бронирований успешно получена");
            response.setUser(userDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении истории бронирований: " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response blockUser(Long userId, boolean enable) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new MessException("Пользователь с ID " + userId + " не найден"));
            user.setEnabled(enable);
            userRepository.save(user);
            response.setStatusCode(200);
            response.setMessage(enable ? "Пользователь активирован" : "Пользователь заблокирован");
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при изменении статуса пользователя: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateUserProfile(String email, UserDTO userDTO) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь с email " + email + " не найден"));
            if (userDTO.getName() != null) user.setName(userDTO.getName());
            if (userDTO.getSurname() != null) user.setSurname(userDTO.getSurname());
            if (userDTO.getPhoneNumber() != null) user.setPhoneNumber(userDTO.getPhoneNumber());
            User updatedUser = userRepository.save(user);
            UserDTO updatedUserDTO = ModelMapper.mapUserEntityToUserDTO(updatedUser);
            response.setStatusCode(200);
            response.setMessage("Профиль пользователя успешно обновлен");
            response.setUser(updatedUserDTO);
        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при обновлении профиля пользователя: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getHotelsOfLoggedInHotelier(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new MessException("Пользователь не найден"));

            if (!user.getRole().equals(Role.HOTELIER)) {
                throw new MessException("Текущий пользователь не является владельцем отелей");
            }

            List<Hotel> hotels = hotelRepository.findByUser(user);
            List<HotelDTO> hotelDTOs = ModelMapper.mapHotelListEntityToHotelListDTO(hotels);

            response.setStatusCode(200);
            response.setMessage("Список отелей успешно получен");
            response.setHotelList(hotelDTOs);
        } catch (MessException e) {
            response.setStatusCode(403);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении списка отелей: " + e.getMessage());
        }
        return response;
    }
}

