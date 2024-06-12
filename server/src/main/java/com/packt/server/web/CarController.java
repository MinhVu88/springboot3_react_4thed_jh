package com.packt.server.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.server.domain.Car;
import com.packt.server.repository.CarRepository;

@RestController
public class CarController {
	private final CarRepository carRepository;

	public CarController(CarRepository carRepo) {
		this.carRepository = carRepo;
	}

	@GetMapping("/cars")
	public Iterable<Car> getCars() {
		return this.carRepository.findAll();
	}
}
