package com.demo.service;

import org.springframework.http.ResponseEntity;

import java.util.Date;

public interface HistoryService {
//hàm timf theo ngày
    //hàm theo ngày cũ hơn
    //thông báo theo tài khoản
    //tìm theo sản phẩm
    ResponseEntity<?> findByDate(Date date,int page,String sort);
    ResponseEntity<?> findByDateold(Date date,int page,String sort);
    ResponseEntity<?> findByProduct(int pid,int page,String sort);

}
