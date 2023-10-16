package com.demo.repository;

import com.demo.model.Receipt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepo extends JpaRepository<Receipt,Integer> {
    @Query(value = "select * from receipt where YEAR(date_in)>= :yf and YEAR(date_in)<=:yl " +
            "and MONTH(date_in)>=:mf and MONTH(date_in)<=:ml " +
            "and DAY(date_in)>=:df and DAY(date_in)<=:dl ",nativeQuery = true)
    Page<Receipt> findAllByDate(@Param("yf")int yf,
                                @Param("yl")int yl,
                                @Param("mf")int mf,
                                @Param("ml")int ml,
                                @Param("df")int df,
                                @Param("dl")int dl,
                                Pageable pageable);
}
