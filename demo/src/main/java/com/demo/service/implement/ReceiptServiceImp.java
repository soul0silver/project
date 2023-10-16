package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.Receipt;
import com.demo.repository.ReceiptRepo;
import com.demo.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReceiptServiceImp extends BaseRespon implements ReceiptService {
    @Autowired
    ReceiptRepo receiptRepo;
    @Override
    public ResponseEntity<?> save(Receipt receipt) {

        return getResponEntity(receiptRepo.save(receipt));
    }

    @Override
    public ResponseEntity<?> findByDate(int yf, int yl, int mf, int ml, int df, int dl, int page, String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(receiptRepo.findAllByDate(yl,yl,mf,ml,df,dl,pageable));
    }

    @Override
    public ResponseEntity<?> delete(Receipt receipt) {
        receipt.setStatus(false);
        return getResponEntity(receiptRepo.save(receipt));
    }

    @Override
    public ResponseEntity<?> view(int id) {

        return getResponEntity(receiptRepo.findById(id).get());
    }
}
