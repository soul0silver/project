package com.demo.repository;

import com.demo.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends PagingAndSortingRepository<Employee,Integer> {
    @Query(value = "select * from employee where firstname=:firstname and lastname=:lastname ",
            nativeQuery = true)
    Page<Employee> findByName(@Param("firstname") String firstname,@Param("lastname") String lastname, Pageable pageable);
    Page<Employee> findAllByLastnameOrFirstname(String lastname,String firstname,Pageable pageable);
    Employee findEmployeeByPhoneContains(String phone);
    Page<Employee> findEmployeeByStore(int store,Pageable pageable);
    Page<Employee> findAllByBirthday(Date birthday,Pageable pageable);
    Employee findEmployeeByIdentification(String identification);
    Page<Employee> findAllByEmailContains(String email,Pageable pageable);
}
