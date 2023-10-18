package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.Color;
import com.demo.model.DTO.ProductDTO;
import com.demo.model.Product;
import com.demo.model.Rom;
import com.demo.repository.ColorRepo;
import com.demo.repository.PCRepo;
import com.demo.repository.ProductRepo;
import com.demo.repository.RomRepo;
import com.demo.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class ProductServiceImp extends BaseRespon implements ProductService  {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    PCRepo pcRepo;
    @Autowired
    ColorRepo colorRepo;
    @Autowired
    RomRepo romRepo;
    @Override
    public ResponseEntity<?> save(Product p,int[] color,int[] roms) {
        Set<Color> colors=new HashSet<>();
        for (int i:color){
            colors.add(colorRepo.findById(i).get());
        }
        p.setColors(colors);
        Set<Rom> romSet=new HashSet<>();
        for (int i:roms){
            romSet.add(romRepo.findById(i).get());
        }
        p.setRoms(romSet);
        return getResponEntity(productRepo.save(p));
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
