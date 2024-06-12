package com.packt.server.service;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtService {
	static final long EXPIRATION_TIME = 86400000;
	
	// 1 day in ms. Should be shorter in production.
	static final String PREFIX = "Bearer";

	static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	// Generate signed JWT token
	public String getToken(String username) {
		String token = Jwts.builder()
											 .setSubject(username)
											 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
											 .signWith(secretKey)
											 .compact();
		return token;
	}

	public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

		if(token != null) {
			String user = Jwts.parserBuilder()
												.setSigningKey(secretKey)
												.build()
												.parseClaimsJws(token.replace(PREFIX, ""))
												.getBody()
												.getSubject();

			if(user != null) {
				return user;
			}
		}

		return null;
	}
}