package com.packt.server.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.packt.server.domain.AppUser;
import com.packt.server.repository.AppUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private final AppUserRepository appUserRepository;

	public UserDetailsServiceImpl(AppUserRepository appUserRepo) {
		this.appUserRepository = appUserRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<AppUser> user = this.appUserRepository.findByUsername(username);
		
		UserBuilder userBuilder = null;
		
		if(user.isPresent()) {
			AppUser currentUser = user.get();
			
			userBuilder = User.withUsername(username);
			userBuilder.password(currentUser.getPassword());
			userBuilder.roles(currentUser.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}

		return userBuilder.build();
	}
}