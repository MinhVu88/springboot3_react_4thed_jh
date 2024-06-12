package com.packt.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.packt.server.domain.Car;

public interface CarRepository extends CrudRepository<Car, Long> {}