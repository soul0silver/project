package com.demo.controller;
import com.demo.model.Employee;
import com.demo.service.implement.EmployeeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
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
    ResponseEntity<?> getAll(@RequestParam("page") int  page,@RequestParam("sort") String sort){
        return employeeServiceImp.getAll(page,sort);
    }

    @PostMapping("/save")
    ResponseEntity<?> save(@RequestBody Employee employee){

        return employeeServiceImp.save(employee);
    }
}
