package com.demo.service;

import com.demo.model.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> save(Product p);
    ResponseEntity<?> delete(Product p);
    ResponseEntity<?> findByPname(String pname);
    ResponseEntity<?> findByPrice(double price,int page, String sort);
    ResponseEntity<?> findByCid(int cid,int page, String sort);
    ResponseEntity<?> findByStatus(int status,int page, String sort);
    public ResponseEntity<?> getListProductPage(int page, String propSortName);
}
