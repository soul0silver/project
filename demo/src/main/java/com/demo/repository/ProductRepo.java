package com.demo.repository;

import com.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    Product findByPname(String pname);

    @Query(value = "select p.pid,p.pname,SUM(s.quantity) as quan " +
            "from  product p,stock s,price pc " +
            "where p.pid=pc.pid and pc.id=s.pr and pc.price=:price group by p.pid ", nativeQuery = true)
    Page<Product> findAllByPrice(@Param("price")double price, Pageable pageable);

    @Query(value = "select p.pid,p.pname,SUM(s.quantity) as quan " +
            "from  product p,stock s,price pc " +
            "where p.pid=pc.pid and pc.id=s.pr group by p.pid "
            , nativeQuery = true)
    List<Map<String, Object>> getAll(Pageable pageable);

    @Query(value = "select p.pid,p.pname,SUM(s.quantity) as quan,c.color " +
            "from stock s, product p,price pc,color c " +
            "where p.pid=pc.pid and pc.id=s.pr group by p.pid , c.id "
            , nativeQuery = true)
    List<Map<String, Object>> getAllByColor(Pageable pageable);

    @Query(value = "select p.pid,p.pname,SUM(s.quantity) as quan " +
            "from stock s, product p,price pc " +
            "where p.pid=pc.pid and pc.id=s.pr group by p.pid where s.store=:store "
            , nativeQuery = true)
    List<Map<String, Object>> getAllByStore(@Param("store") int store, Pageable pageable);

    @Query(value = "select p.pid,p.pname,SUM(s.quantity) as quan,c.color " +
            "from stock s, product p,price pc,color c " +
            "where p.pid=pc.pid and pc.id=s.pr and s.store=:store group by p.pid , c.id "
            , nativeQuery = true)
    List<Map<String, Object>> getAllByColorAndStore(Pageable pageable, @Param("store") int store);


    @Query(value = "insert into stock(store,quantity,pr) values (:store,:quantity,:pr)", nativeQuery = true)
    void receipt(@Param("pr") int pr, @Param("quantity") int quantity, @Param("store") int store);


}
