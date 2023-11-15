package com.demo.service;

import com.demo.model.DTO.ProductDTO;
import com.demo.model.Price;
import com.demo.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<?> save(Product p,List<Price> prices);
    ResponseEntity<?> delete(int id);
    ResponseEntity<?> findByPname(String pname);
    ResponseEntity<?> findByPrice(double price,int page, String sort);
    ResponseEntity<?> receipt(List<ProductDTO> list,int store);
    public ResponseEntity<?> getListProductPage(int page, String propSortName);
    ResponseEntity<?> findById(int id);
    ResponseEntity<?> getColor();
    ResponseEntity<?> getRom();
    ResponseEntity<?> update(ProductDTO product);
}
