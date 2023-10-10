package com.demo.repository;

import com.demo.model.Employee;
import com.sun.source.doctree.SeeTree;
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
    @Query(value = "select * from employee where lastname like :lastname% and\n" +
            "                            firstname like :firstname% and\n" +
            "                            phone like :phone% and\n" +
            "                            identification like :iden% and\n" +
            "                            email like :email% and\n" +
            "                            aid >=:aidf and aid <=:aidl and\n" +
            "                            salary>=:salf and salary<=:sall and\n" +
            "                            store >=:storef and store<=:storel and\n" +
            "                            year(birthday) >= :yf and year(birthday)<=:yl and\n" +
            "                            month(birthday)>=:mf and month(birthday)<=:ml and\n" +
            "                            day(birthday)>=:df and day(birthday)<=:dl",nativeQuery = true )
    Page<Employee> findEmpBy(
            @Param("firstname") String firstname,
            @Param("lastname")String lastname,
            @Param("iden")String identification,
            @Param("phone")String phone,
            @Param("email")String email,
            @Param("aidf") int aidf,
            @Param("aidl") int aidl,
            @Param("salf")double salf,
            @Param("sall")double sall,
            @Param("storef")int storef,
            @Param("storel")int storel,
            @Param("yf")int yf,
            @Param("yl")int yl,
            @Param("mf")int mf,
            @Param("ml")int ml,
            @Param("df")int df,
            @Param("dl")int dl,
            Pageable pageable
    );
}
