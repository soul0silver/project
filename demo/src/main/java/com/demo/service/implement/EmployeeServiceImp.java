package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.Employee;
import com.demo.repository.EmployeeRepo;
import com.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.stereotype.Service;
import org.w3c.dom.ls.LSInput;

import java.util.Date;
import java.util.List;

@Service
public class EmployeeServiceImp extends BaseRespon implements EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;

    @Override
    public ResponseEntity<?> findByName(String firstname, String lastname,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));

        return getResponEntity(employeeRepo.findByName(firstname,lastname,pageable));
    }

    @Override
    public ResponseEntity<?> findAllByLastnameOrFirstname(String lastname, String firstname
            ,int page,String sort) {

        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        Page<Employee> list= employeeRepo.findAllByLastnameOrFirstname(lastname,firstname,pageable);

        return getResponEntity(list);
    }

    @Override
    public ResponseEntity<?> findEmployeeByPhone(String phone) {
        return getResponEntity(employeeRepo.findEmployeeByPhoneStartsWith(phone));
    }

    @Override
    public ResponseEntity<?> findEmployeeByStore(int store,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(employeeRepo.findEmployeeByStore(store,pageable));
    }

    @Override
    public ResponseEntity<?> findAllByBirthday(Date birthday,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(employeeRepo.findAllByBirthday(birthday,pageable));
    }

    @Override
    public ResponseEntity<?> findEmployeeByIdentification(String identification) {
        return getResponEntity(employeeRepo.findEmployeeByIdentification(identification));
    }

    @Override
    public ResponseEntity<?> getAll(int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(employeeRepo.findAll(pageable));
    }

    @Override
    public ResponseEntity<?> delete(Employee employee) {
        Employee e=employeeRepo.findById(employee.getEid()).get();
        e.setStatus(0);
        return getResponEntity("Delete success");
    }

    @Override
    public ResponseEntity<?> save(Employee employee) {
        return getResponEntity(employeeRepo.save(employee));

    }

    @Override
    public ResponseEntity<?> findAllByEmailContains(String email,int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return getResponEntity(employeeRepo.findAllByEmailContains(email,pageable));
    }

}
