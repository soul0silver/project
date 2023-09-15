package com.demo.service;

import com.demo.model.Role;

import java.util.Optional;

public interface RoleSevice {
    Optional<Role> findByRname(String rname);
}
