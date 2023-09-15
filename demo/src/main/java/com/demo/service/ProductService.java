package com.demo.service;

import com.demo.model.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> save(Product p);
    ResponseEntity<?> delete(Product p);
    ResponseEntity<?> findByPname(String pname);
    ResponseEntity<?> findByPrice(double price);
    ResponseEntity<?> findByCid(int cid);
    ResponseEntity<?> findByStatus(int status);
    public ResponseEntity<?> getListProductPage(int page, String propSortName);
}
