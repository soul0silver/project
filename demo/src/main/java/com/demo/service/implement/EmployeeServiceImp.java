package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.DTO.EmpDto;
import com.demo.model.Employee;
import com.demo.repository.EmployeeRepo;
import com.demo.repository.UserRepo;
import com.demo.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.stereotype.Service;
import org.w3c.dom.ls.LSInput;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImp extends BaseRespon implements EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    UserRepo userRepo;
    @Override
    public ResponseEntity<?> findAllBy(String firstname, String lastname, String identification, String phone, String email, int aidf,
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
                                       int dl, int page, String sort) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.ASC, sort));

        return getResponEntity(employeeRepo.findEmpBy(
                firstname,
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
                dl, pageable));
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.ASC, sort));
        return getResponEntity(employeeRepo.findAll(pageable));
    }

    @Override
    public ResponseEntity<?> delete(Employee employee) {
        Employee e = employeeRepo.findById(employee.getEid()).get();
        e.setStatus(0);
        return getResponEntity("Delete success");
    }

    @Override
    public ResponseEntity<?> save(Employee employee) {
        return getResponEntity(employeeRepo.save(employee));

    }
    public ResponseEntity<?> findByStore(int store){
        List<EmpDto> list=new ArrayList<>();
        ObjectMapper mapper=new ObjectMapper();
        List<Map<String,Object>> maps=employeeRepo.findAllByStore(store);
        for (Map m:maps){
            EmpDto dto=mapper.convertValue(m,EmpDto.class);
            list.add(dto);
        }
        return getResponEntity(list);
    }
    public ResponseEntity<?> findByUsername(String username){
        Employee employee=employeeRepo.findById(userRepo.findUsername(username).getEid()).get();
        return getResponEntity(employee);
    }
}
