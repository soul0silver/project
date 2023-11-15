package com.demo.repository;

import com.demo.model.nest.Quantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface StockRepo extends JpaRepository<Quantity,Integer> {
    @Query(value = "select s.pr, sum(s.quantity) from quantity s,price p where s.pr=p.id and p.id=:pr group by s.pr",
            nativeQuery = true)
    List<Quantity> getQuantityByPrice(@Param("pr") int pr);
    @Query(value = "select s.qid, p2.pname,c.color,r.size from quantity s,price p, product p2,color c,rom r " +
            "where s.price=p.id and p.pid=p2.pid and p.rom=r.id and p.color=c.id and p2.pname like :pname% and s.store=:store",
            nativeQuery = true)
    List<Map<String,Object>> search(@Param("pname")String pname,@Param("store") int store);
    Quantity findByPriceAndStore(int price, int store);
}
