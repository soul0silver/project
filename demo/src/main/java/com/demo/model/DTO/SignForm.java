package com.demo.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignForm {
    private String username;
    private String password;
    private String email;
    private int eid;
    private int[] rid;
}
