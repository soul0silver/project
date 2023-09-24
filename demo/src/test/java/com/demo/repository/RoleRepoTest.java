package com.demo.repository;

import com.demo.model.Role;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class RoleRepoTest {
    @Autowired
    RoleRepo repo;
    @AfterEach
    void del(){
        repo.deleteAll();
    }
    @Test
    void saveTest(){
        String rname="role_manager";
        Role role=new Role();
        role.setRname(rname);
        Role r= repo.save(role);
        assertThat(r.getRname()).isEqualTo(rname);
    }
}