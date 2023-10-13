package com.demo.repository;

import com.demo.model.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PCRepo extends JpaRepository<ProductColor,Integer> {
    ProductColor findByColorAndPid(int color,int pid);
}
