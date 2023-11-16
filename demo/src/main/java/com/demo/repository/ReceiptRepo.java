package com.demo.repository;

import com.demo.model.Receipt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ReceiptRepo extends JpaRepository<Receipt,String> {
    @Query(value = "select r.*,(rd.quantity*p.priceim) from receipt r,receipt_detail rd,quantity s, price p " +
            "where r.id=rd.receiptid and rd.stock=s.qid and s.price=p.id " +
            "and YEAR(date_in)>= :yf " +
            "and YEAR(date_in)<=:yl " +
            "and MONTH(date_in)>=:mf and MONTH(date_in)<=:ml " +
            "and DAY(date_in)>=:df and DAY(date_in)<=:dl ",nativeQuery = true)
    Page<Map<String,Object>> findAllByDate(@Param("yf")int yf,
                            @Param("yl")int yl,
                            @Param("mf")int mf,
                            @Param("ml")int ml,
                            @Param("df")int df,
                            @Param("dl")int dl,
                            Pageable pageable);
    Page<Receipt> findAllByStore(int store,Pageable pageable);
    @Query(value = "select r.*,sum(rd.quantity*p.priceim) as amount from receipt r,receipt_details rd,quantity s, price p " +
            "where r.id=rd.receiptid and rd.stock=s.qid and s.price=p.id group by r.id"
            ,nativeQuery = true)
    Page<Map<String,Object>> find(Pageable pageable);
}
