package com.demo.baserespon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

@Setter
@Getter

@NoArgsConstructor
public class JwtResponse {
    private String username;
    private String type="Bearer";
    private String token;
    private Collection<? extends GrantedAuthority> roles;

    public JwtResponse(String username, String token, Collection<? extends GrantedAuthority> roles) {
        this.username = username;
        this.token = token;
        this.roles = roles;
    }
}
