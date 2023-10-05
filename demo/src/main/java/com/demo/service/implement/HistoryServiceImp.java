package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.repository.HistoryRepo;
import com.demo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class HistoryServiceImp extends BaseRespon implements HistoryService {
    @Autowired
    HistoryRepo historyRepo;
    @Override
    public ResponseEntity<?> findByDate(Date date,int page,String sort) {
        Pageable pageable= PageRequest.of(page,10, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(historyRepo.findByDate(date,pageable));
    }

    @Override
    public ResponseEntity<?> findByDateold(Date date,int page,String sort) {
        Pageable pageable= PageRequest.of(page,10, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(historyRepo.findByDateold(date,pageable));

    }
    @Override
    public ResponseEntity<?> findByProduct(int pid,int page,String sort) {
        Pageable pageable= PageRequest.of(page,10, Sort.by(Sort.Direction.ASC,sort));

        return getResponEntity(historyRepo.findByProduct(pid,pageable));
    }
}
