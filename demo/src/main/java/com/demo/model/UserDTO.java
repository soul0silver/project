package com.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long uid;
    private String username;
    private String password;
    private String email;
    private String rname;

    public UserDTO(String username, String password, String email, String rname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.rname = rname;
    }
}
