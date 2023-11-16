package com.demo.controller;

import com.demo.model.Employee;
import com.demo.service.implement.EmployeeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping(value = "/employee")
@CrossOrigin("*")
public class EmployeeController {
    @Autowired
    EmployeeServiceImp employeeServiceImp;

    @GetMapping(value = "/all")
    ResponseEntity<?> getAll(@RequestParam("page") int page, @RequestParam("sort") String sort) {
        return employeeServiceImp.getAll(page, sort);
    }

    @PostMapping("/save")
    ResponseEntity<?> save(@RequestBody Employee employee) {
        return employeeServiceImp.save(employee);
    }

    @GetMapping(value = "/by")
    ResponseEntity<?> getByName(
            @RequestParam("page") int page,
            @RequestParam("sort") String sort,
            @RequestParam("lastname") String lastname,
            @RequestParam("firstname") String firstname,
            @RequestParam("identification") String identification,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("aidf") int aidf,
            @RequestParam("aidl")int aidl,
            @RequestParam("salf") double salf,
            @RequestParam("sall") double sall,
            @RequestParam("storef") int storef,
            @RequestParam("storel")int storel,
            @RequestParam("yf")int yf,
            @RequestParam("yl") int yl,
            @RequestParam("mf")int mf,
            @RequestParam("ml") int ml,
            @RequestParam("df")int df,
            @RequestParam("dl")int dl
            ) {
        return employeeServiceImp.findAllBy(firstname,
                lastname,
                identification,
                phone,
                email,
                aidf,
                aidl,
                salf,
                sall,
                storef,
                storel,
                yf,
                yl,
                mf,
                ml,
                df,
                dl,
                page, sort);
    }
    @GetMapping("/")
    ResponseEntity<?> findByStore(@RequestParam int store){
        return employeeServiceImp.findByStore(store);
    }
    @GetMapping("/find")
    ResponseEntity<?> findById(@RequestParam String username){

        return employeeServiceImp.findByUsername(username);
    }

}
