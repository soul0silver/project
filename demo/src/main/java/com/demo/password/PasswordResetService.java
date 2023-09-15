package com.demo.password;

import com.demo.model.User;

public interface PasswordResetService {
    public void generatePassReset(User user,String token);
    public String validateToken(String token);
    public User findByToken(String token);
}
