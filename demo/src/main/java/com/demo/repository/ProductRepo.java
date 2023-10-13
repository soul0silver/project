package com.demo.repository;

import com.demo.model.DTO.ProductDTO;
import com.demo.model.Product;
import net.bytebuddy.TypeCache;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.PrimitiveIterator;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    Product findByPname(String pname);
    Page<Product> findAllByPrice(double price, Pageable pageable);
    Page<Product> findAllByCid(int cid, Pageable pageable);

    @Query(value = "select p.pid,p.pname,p.price,sum(s.quantity) quan" +
            "from stock s, product p,product_color pc " +
            "where p.pid=pc.pid and pc.id=s.pcid group by  p.pid"
            , nativeQuery = true)
    List<Map<String,Object>>getAll(Pageable pageable);
    @Query(value = "select p.pid,p.pname,p.price,s.quantity quan,c.color" +
            "from color c, stock s, product p,product_color pc" +
            "where p.pid=pc.pid and pc.id=s.pcid and c.id=pc.color"
            ,nativeQuery = true)
    List<Map<String,Object>> getAllByColor(Pageable pageable);

    @Query(value = "select p.pid,p.pname,p.price,s.quantity quan,c.color" +
            "from color c, stock s, product p,product_color pc" +
            "where p.pid=pc.pid and pc.id=s.pcid and c.id=pc.color and s.store=:store"
            ,nativeQuery = true)
    List<Map<String,Object>> getAllByStore(@Param("store")int store,Pageable pageable );

    @Query(value = "insert into stock(store,pcid,quantity) values (:store,:pcid,:quantity)",nativeQuery = true)
    void receipt(@Param("pcid")int pcid,@Param("quantity") int quantity,@Param("store") int store);
}
