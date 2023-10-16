package com.demo.service;

import com.demo.model.Receipt;
import org.springframework.http.ResponseEntity;

public interface ReceiptService {
    ResponseEntity<?> save(Receipt receipt);
    ResponseEntity<?> findByDate(int yf,
                                 int yl,
                                 int mf,
                                 int ml,
                                 int df,
                                 int dl,
                                 int page,String sort);
    ResponseEntity<?> delete(Receipt receipt);
    ResponseEntity<?> view(int id);
}
