package com.packt.server.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.server.domain.AccountCredentials;
import com.packt.server.service.JwtService;

@RestController
public class LoginController {
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public LoginController(
		JwtService jwtService, 
		AuthenticationManager authManager
	) {
		this.jwtService = jwtService;
		this.authenticationManager = authManager;
	}

	@PostMapping("/login")
	public ResponseEntity<?> getToken(@RequestBody AccountCredentials accountCredentials) {
		UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(
			accountCredentials.username(),
			accountCredentials.password()
		);

		Authentication auth = this.authenticationManager.authenticate(upat);
		
		// Generate token
		String token = this.jwtService.getToken(auth.getName());
		
		// Build response with the generated token
		return ResponseEntity.ok()
												 .header(HttpHeaders.AUTHORIZATION, "Bearer" + token)
												 .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
												 .build();
	}
}