package com.demo.repository;

import com.demo.model.DTO.ReceiptDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptDetailRepo extends JpaRepository<ReceiptDetails,Integer> {
    List<ReceiptDetails> findAllByReceiptid(String receiptid);
}
