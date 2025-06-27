package com.jobportal.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // SKIP JWT validation for OPTIONS requests (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            logger.debug("OPTIONS request - skipping JWT filter");
            filterChain.doFilter(request, response);
            return;
        }

        String requestURI = request.getRequestURI();
        logger.info("===> Starting JWT filter for request: {}", requestURI);

        String requestHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        logger.debug("Authorization Header: {}", requestHeader);

        if (StringUtils.hasText(requestHeader) && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7);
            logger.debug("Extracted token: {}", token);

            try {
                username = jwtHelper.getUsernameFromToken(token);
                logger.info("Username extracted from token: {}", username);
            } catch (IllegalArgumentException e) {
                logger.error("Error extracting username from token (IllegalArgumentException)", e);
            } catch (ExpiredJwtException e) {
                logger.warn("Token has expired", e);
            } catch (MalformedJwtException e) {
                logger.warn("Token is malformed", e);
            } catch (Exception e) {
                logger.error("Unknown error while extracting username from token", e);
            }

        } else {
            logger.warn("Authorization header is missing or doesn't start with Bearer");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.info("Fetching user details for username: {}", username);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (userDetails == null) {
                logger.error("UserDetailsService returned null for username: {}", username);
            } else {
                logger.info("Validating token for user: {}", userDetails.getUsername());
                boolean isValid = jwtHelper.validateToken(token, userDetails.getUsername());

                if (isValid) {
                    logger.info("Token is valid. Setting authentication for user: {}", username);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    logger.warn("Token is INVALID for user: {}", username);
                }
            }
        }

        logger.info("<=== Continuing filter chain for request: {}", requestURI);
        filterChain.doFilter(request, response);
    }
}
