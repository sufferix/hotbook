package com.hotel.hb_backend.service;

import com.hotel.hb_backend.dto.LoginRequest;
import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.dto.UserDTO;
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

    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null ) {
                user.setRole(Role.USER);
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new MessException(user.getEmail() + "Уже существует");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (MessException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка, возникшая при регистрации пользователя " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {

        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new MessException("пользователь не найден"));

            var token = jwtTokenService.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 дней");
            response.setMessage("с");

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Возникла ошибка при входе пользователя в систему " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsers() {

        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = ModelMapper.mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(200);
            response.setMessage("с");
            response.setUserList(userDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Ошибка при получении всех пользователей " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {

        Response response = new Response();


        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MessException("Пользователь не найден"));
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
            response.setStatusCode(200);
            response.setMessage("с");
            response.setUser(userDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Ошибка при получении всех пользователей " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(String userId) {

        Response response = new Response();

        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MessException("Пользователь не найден"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("с");

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Ошибка при получении всех пользователей " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {

        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new MessException("Пользователь не найден"));
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Успех");
            response.setUser(userDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Ошибка при получении всех пользователей " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {

        Response response = new Response();

        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new MessException("Пользователь не найден"));
            UserDTO userDTO = ModelMapper.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("с");
            response.setUser(userDTO);

        } catch (MessException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Ошибка при получении пользователей " + e.getMessage());
        }
        return response;
    }
    public Response blockUser(String userId, boolean enable) {
        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new MessException("Пользователь не найден"));
            if (user.getRole() == Role.ADMIN) {
                throw new MessException("Нельзя заблокировать администратора!");
            }
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
}
