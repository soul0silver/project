package com.demo.repository;

import com.demo.model.Product;
import net.bytebuddy.TypeCache;
import org.springframework.data.domain.Page;
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
    List<Product> findAllByPrice(double price);
    List<Product> findAllByCid(int cid);
    List<Product> findAllByStatus(int status);
    List<Product> findAll(Sort sort);
}
