package com.demo.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private int pid;
    private String pname;
    private int rom;
    private int color;
    private int quan;
    private double price;
}
