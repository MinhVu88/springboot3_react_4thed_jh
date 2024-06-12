package com.packt.server.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.packt.server.domain.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Long> {
	Optional<Owner> findByLastName(String lastName);
}