package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.User;
import com.demo.model.UserDTO;
import com.demo.password.PasswordResetRequest;
import com.demo.repository.UserRepo;

import com.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImp extends BaseRespon implements UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder encoder;
    @Override
    public UserDTO findByUsername(String username) {
        Map<String,Object> map=userRepo.findUsername(username);
        ObjectMapper objectMapper=new ObjectMapper();
        return objectMapper.convertValue(map,UserDTO.class) ;
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    @Transactional
    public void save(User user,int rid) {

        userRepo.save(new User(user.getUsername(), encoder.encode(user.getPassword()), user.getEmail()));
        userRepo.userRole(userRepo.findByEmail(user.getEmail()).getUid(),rid);
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public void resetPassword(User user, String password) {
        user.setPassword(encoder.encode(password));
        userRepo.save(user);
    }
}