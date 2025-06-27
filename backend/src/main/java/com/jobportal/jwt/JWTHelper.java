//package com.jobportal.jwt;
//
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Component
//public class JWTHelper {
//
//    // Secret key for signing tokens (HMAC SHA256)
//    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//    // Token validity duration (1 hour)
//    private static final long JWT_TOKEN_VALIDITY = 3600000;
//
//
//
//    // Extract username from token
//    public String getUsernameFromToken(String token) {
//        return getClaimFromToken(token, Claims::getSubject);
//    }
//
//    // Extract expiration date from token
//    public Date getExpirationDateFromToken(String token) {
//        return getClaimFromToken(token, Claims::getExpiration);
//    }
//
//    // Generic method to extract any claim
//    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = getAllClaimsFromToken(token);
//        return claimsResolver.apply(claims);
//    }
//
//    // Extract all claims using secret key
//    private Claims getAllClaimsFromToken(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SECRET_KEY)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    // Check if token is expired
//    private boolean isTokenExpired(String token) {
//        return getExpirationDateFromToken(token).before(new Date());
//    }
//
//    // Generate token with username as subject
//    public String generateToken(UserDetails userDetail) {
//        Map<String,Object> claims=new HashMap<>();
//        CustomUserDetails customUserDetails=(CustomUserDetails) userDetail;
//        claims.put("id",customUserDetails.getId());
//        claims.put("name",customUserDetails.getName());
//        claims.put("accountType",customUserDetails.getAccountType());
//        claims.put("profileId",customUserDetails.getProfileId());
//        return doGenerateToken(claims,userDetail.getUsername());
//    }
//
//    // Create the token by signing it with the secret key
//    private String doGenerateToken(Map<String, Object> claims, String subject) {
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
//                .signWith(SECRET_KEY)
//                .compact();
//    }
//
//
//    // Validate token with username and expiration
//    public boolean validateToken(String token, String username) {
//        final String extractedUsername = getUsernameFromToken(token);
//        return (extractedUsername.equals(username) && !isTokenExpired(token));
//    }
//}
package com.jobportal.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTHelper {

    private static final Logger logger = LoggerFactory.getLogger(JWTHelper.class);

    // HMAC SHA256 key
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long JWT_TOKEN_VALIDITY = 3600000; // 1 hour

    public String getUsernameFromToken(String token) {
        logger.debug("Extracting username from token");
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        logger.debug("Extracting expiration from token");
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        logger.debug("Extracting claim from token");
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        logger.debug("Parsing all claims from token");
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        boolean expired = getExpirationDateFromToken(token).before(new Date());
        logger.debug("Token expired: {}", expired);
        return expired;
    }

    public String generateToken(UserDetails userDetail) {
        logger.info("Generating token for user: {}", userDetail.getUsername());

        Map<String, Object> claims = new HashMap<>();
        if (userDetail instanceof CustomUserDetails customUserDetails) {
            claims.put("id", customUserDetails.getId());
            claims.put("name", customUserDetails.getName());
            claims.put("accountType", customUserDetails.getAccountType());
            claims.put("profileId", customUserDetails.getProfileId());
        }

        return doGenerateToken(claims, userDetail.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        logger.debug("Creating JWT with subject: {}", subject);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token, String username) {
        try {
            String tokenUsername = getUsernameFromToken(token);
            boolean isValid = tokenUsername.equals(username) && !isTokenExpired(token);
            logger.debug("Token username match: {}, not expired: {}", tokenUsername.equals(username), !isTokenExpired(token));
            return isValid;
        } catch (Exception e) {
            logger.error("Token validation error", e);
            return false;
        }
    }
}
