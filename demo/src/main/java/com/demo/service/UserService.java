package com.demo.service;

import com.demo.model.User;
import com.demo.model.DTO.UserDTO;

public interface UserService {
    UserDTO findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    void save(User user,int[] rid);
    User findByEmail(String email);
    void resetPassword(User user, String password);
}
