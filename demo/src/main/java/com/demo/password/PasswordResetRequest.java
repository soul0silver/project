package com.demo.password;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String password;
    private String confirmpassword;

}
