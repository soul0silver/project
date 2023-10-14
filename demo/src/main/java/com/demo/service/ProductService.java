package com.demo.service;

import com.demo.model.DTO.ProductDTO;
import com.demo.model.ProductDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<?> save(ProductDetails p);
    ResponseEntity<?> delete(ProductDetails p);
    ResponseEntity<?> findByPname(String pname);
    ResponseEntity<?> findByPrice(double price,int page, String sort);
    ResponseEntity<?> findByCid(int cid,int page, String sort);
    ResponseEntity<?> receipt(List<ProductDTO> list,int store);
    public ResponseEntity<?> getListProductPage(int page, String propSortName);
}
