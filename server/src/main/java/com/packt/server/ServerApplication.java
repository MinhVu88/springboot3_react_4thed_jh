package com.packt.server;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.packt.server.domain.AppUser;
import com.packt.server.domain.Car;
import com.packt.server.domain.Owner;
import com.packt.server.repository.AppUserRepository;
import com.packt.server.repository.CarRepository;
import com.packt.server.repository.OwnerRepository;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {
	private static final Logger logger = LoggerFactory.getLogger(ServerApplication.class);
	private final CarRepository carRepository;
	private final OwnerRepository ownerRepository;
	private final AppUserRepository appUserRepository;

	public ServerApplication(
		CarRepository carRepo, 
		OwnerRepository ownerRepo,
		AppUserRepository appUserRepo
	) {
		this.carRepository = carRepo;
		this.ownerRepository = ownerRepo;
		this.appUserRepository = appUserRepo;
	}

	@Override
	public void run(String... args) throws Exception {
		Owner owner1 = new Owner("John", "Johnson");
		Owner owner2 = new Owner("Mary", "Robinson");
		this.ownerRepository.saveAll(Arrays.asList(owner1, owner2));

		this.carRepository.save(new Car(
			"Ford", 
			"Mustang", 
			"Red", 
			"ADF-1121", 
			2023, 
			59000, 
			owner1
		));

		this.carRepository.save(new Car(
			"Nissan", 
			"Leaf", 
			"White", 
			"SSJ-3002", 
			2020, 
			29000, 
			owner2
		));

		this.carRepository.save(new Car(
			"Toyota", 
			"Prius", 
			"Silver", 
			"KKO-0212", 
			2022, 
			39000, 
			owner2
		));

		// Username: user | password: user
		this.appUserRepository.save(new AppUser(
			"user", 
			"$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", 
			"USER"
		));
		
		// Username: admin | password: admin
		this.appUserRepository.save(new AppUser(
			"admin",
			"$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", 
			"ADMIN"
		));
		
		for (Car car : this.carRepository.findAll()) {
			logger.info("brand: {} | model: {}", car.getBrand(), car.getModel());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}
