package com.demo.repository;

import com.demo.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SupplierRepo extends JpaRepository<Supplier,String> {
    Boolean existsByName(String name);
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    List<Supplier> findAllByStatusIsTrue();
}
