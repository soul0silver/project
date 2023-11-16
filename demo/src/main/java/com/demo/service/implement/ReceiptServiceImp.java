package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.DTO.GRNdto;
import com.demo.model.DTO.ReceiptDetails;
import com.demo.model.DTO.StockDTO;
import com.demo.model.Receipt;
import com.demo.model.nest.Quantity;
import com.demo.repository.ReceiptDetailRepo;
import com.demo.repository.ReceiptRepo;
import com.demo.repository.StockRepo;
import com.demo.service.ReceiptService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ReceiptServiceImp extends BaseRespon implements ReceiptService {
    @Autowired
    ReceiptRepo receiptRepo;
    @Autowired
    StockRepo stockRepo;
    @Autowired
    ReceiptDetailRepo detailRepo;
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
    public ResponseEntity<?> view(String id) {
        return getResponEntity(receiptRepo.findById(id).get());
    }

    @Override
    public ResponseEntity<?> getAll(int store, int page, String sort) {
        ObjectMapper mapper=new ObjectMapper();
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        List<GRNdto> list=new ArrayList<>();
        if (store==0){
            Page<Map<String,Object>> maps=receiptRepo.find(pageable);
            for (Map m:maps){
                list.add(mapper.convertValue(m,GRNdto.class));
            }
            return getResponEntity(list);
        }
        return getResponEntity(receiptRepo.findAllByStore(store,pageable));
    }

    @Override
    public ResponseEntity<?> search(String pname, int store) {
        ObjectMapper mapper=new ObjectMapper();
        List<StockDTO> stockDTOS=new ArrayList<>();
        List<Map<String,Object>> list=stockRepo.search(pname,store);
        for (Map i:list){
            StockDTO stockDTO=mapper.convertValue(i,StockDTO.class);
            stockDTOS.add(stockDTO);
        }
        return getResponEntity(stockDTOS);
    }

    @Override
    @Transactional
    public ResponseEntity<?> importGood(List<StockDTO> dtos,int[] quan,Receipt receipt) {
        Receipt re= receiptRepo.save(receipt);
        List<ReceiptDetails> list=new ArrayList<>();
            for (int i=0;i<dtos.size();i++){
            ReceiptDetails details=new ReceiptDetails();
            details.setReceiptid(re.getId());
            details.setStock(dtos.get(i).getQid());
            details.setQuantity(quan[i]);
            list.add(detailRepo.save(details));
        }
        if (list.size()==dtos.size()) return getResponEntity("Create GRN success");
        return getResponEntity("Create fail");
    }

    @Override
    public ResponseEntity<?> exportGood(int price,int store,int quan) {
        return null;
    }

    @Override
    public ResponseEntity<?> move(int price, int store1, int quan, int store2) {
        return null;
    }

    @Override
    public ResponseEntity<?> checked(String receipt_id,Boolean status) {
        Receipt receipt=receiptRepo.getById(receipt_id);
        receipt.setStatus(status);
        List<ReceiptDetails> list=detailRepo.findAllByReceiptid(receipt_id);
        List<Quantity> quantities=new ArrayList<>();
        if (status) {
            for (ReceiptDetails i:list){
                Quantity q=stockRepo.getById(i.getStock());
                q.setQuantity(q.getQuantity()+i.getQuantity());
                q= stockRepo.save(q);
                if (q!=null) quantities.add(q);
            }
        }
        if (quantities.size()== list.size()) return getResponEntity("Import success");
        return getResponEntity("Import fail");
    }

}
