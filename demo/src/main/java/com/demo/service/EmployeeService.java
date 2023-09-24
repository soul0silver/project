package com.demo.service;

import com.demo.model.Employee;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Date;

public interface EmployeeService {
    ResponseEntity<?> findByName(String firstname, String lastname, int page, String sort);
    ResponseEntity<?> findAllByLastnameOrFirstname(String lastname,String firstname,int page,String sort);
    ResponseEntity<?>findEmployeeByPhone(String phone);
    ResponseEntity<?> findEmployeeByStore(int store,int page,String sort);
    ResponseEntity<?> findAllByBirthday(Date birthday,int page,String sort);
    ResponseEntity<?> findEmployeeByIdentification(String identification);
    ResponseEntity<?> getAll(int page,String sort);
    ResponseEntity<?> delete(Employee employee);
    ResponseEntity<?> save(Employee employee);
    ResponseEntity<?> findAllByEmailContains(String email,int page,String sort);
}
