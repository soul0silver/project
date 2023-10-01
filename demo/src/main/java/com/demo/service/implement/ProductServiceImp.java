package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.Product;
import com.demo.repository.ProductRepo;
import com.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImp extends BaseRespon implements ProductService  {
    @Autowired
    ProductRepo productRepo;

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
    public ResponseEntity<?> findByCid(int cid,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));

        return getResponEntity(productRepo.findAllByCid(cid,pageable));
    }

    

    @Override
    public ResponseEntity<?> getListProductPage(int page, String propSortName) {
        Pageable pageable= PageRequest.of(page,10,Sort.by(Sort.Direction.ASC,propSortName));
        Page pages=productRepo.findAll(pageable);
        return getResponEntity(pages);
    }

}
