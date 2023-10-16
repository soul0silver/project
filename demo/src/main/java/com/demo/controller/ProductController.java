package com.demo.controller;

import com.demo.model.Product;
import com.demo.service.implement.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/product")
@RestController
@CrossOrigin("*")
public class ProductController {
    @Autowired
    ProductServiceImp service;
    @GetMapping("list")
    ResponseEntity<?> getall(@RequestParam("page")int page, @RequestParam("sort")String sort){
        return service.getListProductPage(page, sort);

    }
    @PostMapping("save")
    ResponseEntity<?> save(@RequestBody Product product){
        return service.save(product);

    }
    @GetMapping("listof")
    ResponseEntity<?> getallof(@RequestParam("page")int page, @RequestParam("sort")String sort,@RequestParam("store")int store){
        return service.getListProductPage(page, sort);

    }

    @GetMapping("details")
    ResponseEntity<?> findbyid(@RequestParam("id")int pid){
        return service.findById(pid);
    }
}
