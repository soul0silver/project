package com.demo.controller;

import com.demo.model.DTO.GRNform;
import com.demo.service.implement.ReceiptServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("receipt")
@RestController
@CrossOrigin("*")
public class ReceiptController {
    @Autowired
    ReceiptServiceImp serviceImp;
    @GetMapping("/getAll")
    ResponseEntity<?> getListImport(@RequestParam int store,
                                    @RequestParam int page,
                                    @RequestParam String sort){
        return serviceImp.getAll(store,page,sort);
    }
    @GetMapping("/search")
    ResponseEntity<?> search(@RequestParam String pname,@RequestParam int store){
        return serviceImp.search(pname,store);
    }
    @PostMapping("new-grn")
    ResponseEntity<?> saveGRN(@RequestBody GRNform nform){
        return serviceImp.importGood(nform.getList(),nform.getQuan(),nform.getReceipt());
    }
}
