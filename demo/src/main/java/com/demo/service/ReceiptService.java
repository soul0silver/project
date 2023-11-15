package com.demo.service;

import com.demo.model.DTO.StockDTO;
import com.demo.model.Receipt;
import com.demo.model.nest.Quantity;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
    ResponseEntity<?> view(String id);
    ResponseEntity<?> getAll(int store, int page, String sort);
    ResponseEntity<?> search(String pname,int store);
    ResponseEntity<?> importGood(List<StockDTO> dtos, int[] quan, Receipt receipt);
    ResponseEntity<?> exportGood(int price,int store,int quan);
    ResponseEntity<?> move(int price,int store1,int quan,int store2);
    ResponseEntity<?> checked(String receipt_id,Boolean status);
//    ResponseEntity<?> move(int price,int store1,int quan,int store2);
//    ResponseEntity<?> move(int price,int store1,int quan,int store2);

}
