package com.demo.controller;

import com.demo.model.Supplier;
import com.demo.service.SupplierService;
import com.demo.service.implement.SupplierServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    SupplierServiceImp serviceImp;
    @GetMapping("/list")
    public ResponseEntity<?> getList(){
        return serviceImp.getList();
    }
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Supplier supplier){
        return serviceImp.save(supplier);
    }
}
