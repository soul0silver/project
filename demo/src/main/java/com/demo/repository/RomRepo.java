package com.demo.repository;

import com.demo.model.Rom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RomRepo extends JpaRepository<Rom,Integer> {
}
