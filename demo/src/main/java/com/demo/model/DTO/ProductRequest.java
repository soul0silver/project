package com.demo.model.DTO;

import com.demo.model.Color;
import com.demo.model.Product;
import com.demo.model.Rom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Product product;
    private int[] colors;
    private int[] roms;

}
