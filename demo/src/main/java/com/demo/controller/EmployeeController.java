package com.demo.controller;

import com.demo.service.EmployeeService;
import com.demo.service.implement.EmployeeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired
    EmployeeServiceImp employeeServiceImp;
    @GetMapping(value = "/all")
    ResponseEntity<?> getAll(@RequestParam("page") int  page,@RequestParam("sort") String sort){
        return employeeServiceImp.getAll(page,sort);
    }

}
