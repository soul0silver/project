package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.DTO.ProductDTO;
import com.demo.model.Product;
import com.demo.repository.PCRepo;
import com.demo.repository.ProductRepo;
import com.demo.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ProductServiceImp extends BaseRespon implements ProductService  {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    PCRepo pcRepo;

    @Override
    public ResponseEntity<?> save(Product p) {
        productRepo.save(p);
        return getResponEntity(p);
    }

    @Override
    public ResponseEntity<?> delete(Product p) {
        Product product=productRepo.findById(p.getPid()).get();

        productRepo.save(product);
        return getResponEntity(product);
    }


    @Override
    public ResponseEntity<?> findByPname(String pname) {
        return getResponEntity(productRepo.findByPname(pname));
    }

    @Override
    public ResponseEntity<?> findByPrice(double price,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(productRepo.findAllByPrice(price,pageable));
    }



    @Override
    public ResponseEntity<?> receipt(List<ProductDTO> list,int store) {
        for(ProductDTO p:list){
            productRepo.receipt(pcRepo.findByPidAndRomAndColor(p.getPid(),p.getRom(),p.getColor()).getId(),p.getQuan(),store);
        }
        return null;
    }


    @Override
    public ResponseEntity<?> getListProductPage(int page, String propSortName) {
        Pageable pageable= PageRequest.of(page,15,Sort.by(Sort.Direction.ASC,propSortName));

        return getResponEntity(productRepo.getAll(pageable));
    }

    @Override
    public ResponseEntity<?> findById(int id) {
        return getResponEntity(productRepo.findById(id).get());
    }

}
