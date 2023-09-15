package com.demo.service.implement;

import com.demo.model.Role;
import com.demo.repository.RoleRepo;
import com.demo.service.RoleSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImp implements RoleSevice {
    @Autowired
    RoleRepo roleRepo;
    @Override
    public Optional<Role> findByRname(String rname) {
        return roleRepo.findByRname(rname);
    }
}
