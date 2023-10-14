package com.demo.repository;

import com.demo.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PCRepo extends JpaRepository<Price,Integer> {
    Price findByColorAndPid(int color, int pid);
    Price findByPidAndRom(int pid, int rom);
    Price findByPidAndRomAndColor(int pid, int rom, int color);
}
