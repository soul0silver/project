package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.DTO.ProductDTO;
import com.demo.model.Price;
import com.demo.model.Product;
import com.demo.model.nest.Quantity;
import com.demo.model.nest.Store;
import com.demo.repository.*;
import com.demo.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ProductServiceImp extends BaseRespon implements ProductService {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    PCRepo pcRepo;
    @Autowired
    ColorRepo colorRepo;
    @Autowired
    RomRepo romRepo;
    @Autowired
    StockRepo stockRepo;
    @Autowired
    StoreRepo storeRepo;

    @Override
    @Transactional
    public ResponseEntity<?> save(Product p, List<Price> prices) {
        if (productRepo.existsProductsByPname(p.getPname()))
            return ResponseEntity.status(203).body("Product name has already exist");
        Product product= productRepo.save(p);
        for (Price pr : prices) {
            pr.setPid(product.getPid());
        }
        List<Price> list = pcRepo.saveAll(prices);
        List<Store> stores = storeRepo.findAll();
        List<Quantity> stocks = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            for (int s = 0; s < stores.size(); s++) {
                Quantity q =
                        stockRepo.saveAndFlush(
                                new Quantity(0, list.get(i).getId(), stores.get(s).getId(), 0));
                stocks.add(q);
            }
        }
        if (stocks.size() == list.size()* stores.size())
            return getResponEntity("create new product success");
        return getResponEntity("Product info invalid");
    }

    @Override
    public ResponseEntity<?> delete(int id) {
        Product product = productRepo.findById(id).get();
        product.setStatus(3);
        Product p = productRepo.save(product);
        if (p != null)
            return getResponEntity("Delete product success");
        return getResponEntity("Product update fail");
    }


    @Override
    public ResponseEntity<?> findByPname(String pname) {
        return getResponEntity(productRepo.findByPname(pname));
    }

    @Override
    public ResponseEntity<?> findByPrice(double price, int page, String sort) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.ASC, sort));
        return getResponEntity(productRepo.findAllByPrice(price, pageable));
    }


    @Override
    public ResponseEntity<?> receipt(List<ProductDTO> list, int store) {
//        for (ProductDTO p : list) {
//            productRepo.receipt(pcRepo.findByPidAndRomAndColor(p.getProduct().getPid(), p.getRom(), p.getColor()).getId(), p.getQuan(), store);
//        }
        return null;
    }


    @Override
    public ResponseEntity<?> getListProductPage(int page, String propSortName) {
        Pageable pageable = PageRequest.of(page, 15, Sort.by(Sort.Direction.ASC, propSortName));

        return getResponEntity(productRepo.getAll(pageable));
    }

    @Override
    public ResponseEntity<?> findById(int id) {
        Product product = productRepo.findById(id).get();
        List<Price> prices = pcRepo.findAllByPid(product.getPid());
        ProductDTO productDTO = new ProductDTO(product, prices);
        return getResponEntity(productDTO);
    }

    @Override
    public ResponseEntity<?> getColor() {

        return getResponEntity(colorRepo.findAll());
    }

    @Override
    public ResponseEntity<?> getRom() {

        return getResponEntity(romRepo.findAll());
    }

    @Override
    public ResponseEntity<?> update(ProductDTO product) {
        Product pp = productRepo.save(product.getProduct());
        List<Price> prices = product.getPrices();
        int check = 0;
        for (Price p : prices) {
            Price price = pcRepo.save(p);
            if (price != null) check++;
        }
        if (check == prices.size() && pp != null)
            return getResponEntity("update product success");
        return getResponEntity("update product fail");
    }

}
