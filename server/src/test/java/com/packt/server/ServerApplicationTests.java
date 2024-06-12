package com.packt.server;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.packt.server.web.CarController;

@SpringBootTest
class ServerApplicationTests {
	@Autowired 
	private CarController controller;

	@Test
	void contextLoads() {
		assertThat(this.controller).isNotNull();
	}
}
