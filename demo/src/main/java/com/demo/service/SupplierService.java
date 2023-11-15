package com.demo.service;

import com.demo.model.Supplier;
import org.springframework.http.ResponseEntity;

public interface SupplierService {
    ResponseEntity<?> save(Supplier supplier);
    ResponseEntity<?> update(Supplier supplier);
    ResponseEntity<?> delete(String id);
    ResponseEntity<?> getList();
}
