package com.demo;

import com.demo.repository.ProductRepo;
import com.demo.repository.RoleRepo;
import com.demo.service.ProductService;
import com.demo.service.implement.ProductServiceImp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;


@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	RoleRepo repo;

	@Test
	void test(){

	}
}
