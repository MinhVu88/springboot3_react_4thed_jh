package com.packt.server.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.packt.server.domain.Owner;

@DataJpaTest
public class OwnerRepositoryTests {
	@Autowired
	private OwnerRepository ownerRepository;

	@Test
	void testSavingNewOwnerToDb() {
		this.ownerRepository.save(new Owner("Maynard", "Keenan"));
		
		assertThat(
			this.ownerRepository.findByLastName("Keenan").isPresent()
		).isTrue();
	}

	@Test
	void testDeletingOwnersFromDb() {
		this.ownerRepository.save(new Owner("Adam", "Jones"));
		this.ownerRepository.deleteAll();
		assertThat(this.ownerRepository.count()).isEqualTo(0);
	}
}
