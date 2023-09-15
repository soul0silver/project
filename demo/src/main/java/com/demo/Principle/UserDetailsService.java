package com.demo.Principle;

import com.demo.model.UserDTO;
import com.demo.repository.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Map<String,Object> map=userRepo.findUsername(username);
        ObjectMapper objectMapper=new ObjectMapper();
        UserDTO userDTO= objectMapper.convertValue(map,UserDTO.class);
        if (userRepo.existsByUsername(username)==false) throw new UsernameNotFoundException("user not found");
        return UserPrinciple.build(userDTO);
    }
}
