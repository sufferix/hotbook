package com.hotel.hb_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hotel.hb_backend.entity.Role;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String surname;
    private String phoneNumber;
    private Role role;
}