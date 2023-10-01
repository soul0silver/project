package com.demo.Principle;

import com.demo.model.DTO.UserDTO;
import com.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDTO userDTO = new UserDTO(
                userRepo.findUsername(username).getUsername(),
                userRepo.findUsername(username).getPassword(),
                userRepo.findUsername(username).getEmail(),
                userRepo.findRoles(username)
        );
        if (userRepo.existsByUsername(username)==false) throw new UsernameNotFoundException("user not found");
        return UserPrinciple.build(userDTO);
    }
}
