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
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.PrimitiveIterator;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    Product findByPname(String pname);
    Page<Product> findAllByPrice(double price, Pageable pageable);
    Page<Product> findAllByCid(int cid, Pageable pageable);

    @Query(value = "select p.pid,p.pname,c1.cname,p.desc,p.price,p.image,b.brand," +
            "p.ram," +
            "p.cpu," +
            "p.rom,p.version,p.rcamera,p.battery, p.charge," +
            "p.screen,p.resolution,p.widescreen,p.scanfrequency,p.brightness," +
            "p.gpu,p.fcamera,p.os,p.card,c.color,q.quan  from product p," +
            "color c,brand b,product_color pc," +
            " brand_product bp, category c1, (select pid,sum(quantity) quan from  stock group by pid) as q\n" +
            "where p.pid=q.pid " +
            "where p.pid=pc.pid" +
            "and pc.cid=c.id" +
            "and p.pid=bp.bid" +
            "and bp.bid=b.id" +
            "and ", nativeQuery = true)
    List<Map<String,Object>>getAll(Pageable pageable);

}
