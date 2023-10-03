package com.demo.controller;

import com.demo.repository.EmployeeRepo;
import com.demo.service.EmployeeService;
import com.demo.service.implement.EmployeeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired
    EmployeeServiceImp employeeServiceImp;

    @GetMapping(value = "/all")
    ResponseEntity<?> getAll(@RequestParam("page") int  page,@RequestParam("sort") String sort){

        return ResponseEntity.ok().body(employeeServiceImp.getAll(page,sort)) ;
    }

}
