package com.demo.model.DTO;

import com.demo.model.Price;
import com.demo.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
   private Product product;
   private List<Price> prices;
}
