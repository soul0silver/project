package com.demo.service;

import com.demo.model.Employee;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.Date;

public interface EmployeeService {
    ResponseEntity<?> findAllBy(String firstname,
                                String lastname,
                                String identification,
                                String phone,
                                String email,
                                int aidf,
                                int aidl,
                                double salf,
                                double sall,
                                int storef,
                                int storel,
                                int yf,
                                int yl,
                                int mf,
                                int ml,
                                int df,
                                int dl,
                                int page,String sort);
    ResponseEntity<?> getAll(int page,String sort);
    ResponseEntity<?> delete(Employee employee);
    ResponseEntity<?> save(Employee employee);
}
