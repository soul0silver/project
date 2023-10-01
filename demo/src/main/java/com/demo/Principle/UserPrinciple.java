package com.demo.Principle;

import com.demo.model.DTO.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor

public class UserPrinciple implements UserDetails {
    private long uid;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private Collection<? extends GrantedAuthority> roles;
    @Autowired

    public static UserPrinciple build(UserDTO userDTO){
        List<GrantedAuthority> authorities=new ArrayList<GrantedAuthority>();
        authorities= Arrays.stream(userDTO.getRname().toArray()).map((s)-> new SimpleGrantedAuthority(s.toString())).collect(Collectors.toList());

        return new UserPrinciple(
                userDTO.getUid(),
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getEmail(),
                authorities
        );
    }

    public UserPrinciple(UserDTO user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
