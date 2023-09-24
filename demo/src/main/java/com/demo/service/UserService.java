package com.demo.service;

import com.demo.model.User;
import com.demo.model.UserDTO;
import com.demo.password.PasswordResetRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    void save(User user,int[] rid);
    User findByEmail(String email);
    void resetPassword(User user, String password);
}
