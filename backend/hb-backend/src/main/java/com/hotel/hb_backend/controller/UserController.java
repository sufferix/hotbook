package com.hotel.hb_backend.controller;


import com.hotel.hb_backend.dto.Response;
import com.hotel.hb_backend.serviceinterface.IUserService;
import com.hotel.hb_backend.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    // Получение всех пользователей (только для администратора)
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Получение пользователя по ID
    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getUserById(@PathVariable("userId") Long userId) {
        Response response = userService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Удаление пользователя (только для администратора)
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUser(@PathVariable("userId") Long userId) {
        Response response = userService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Получение информации о текущем пользователе
    @GetMapping("/profile")
    public ResponseEntity<Response> getLoggedInUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getProfile(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    // Блокировка пользователя (только для администратора)
    @PutMapping("/{userId}/block")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> blockUser(@PathVariable("userId") Long userId, @RequestParam boolean enable) {
        Response response = userService.blockUser(userId, enable);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Обновление профиля текущего пользователя
    @PutMapping("/profile")
    public ResponseEntity<Response> updateUserProfile(@RequestBody UserDTO userDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.updateUserProfile(email, userDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Получение всех отелей текущего пользователя с ролью HOTELIER
    @GetMapping("/my-hotels")
    @PreAuthorize("hasAuthority('HOTELIER')")
    public ResponseEntity<Response> getHotelsOfLoggedInHotelier() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getHotelsOfLoggedInHotelier(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}

