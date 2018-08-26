package com.github.bartoszpogoda.thesis.teamchallengeapi.auth;


import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.model.JwtToken;
import com.github.bartoszpogoda.thesis.teamchallengeapi.user.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class TokenService {

    @Value("${teamchallengeapi.token.validity-seconds}")
    private int accessTokenValiditySeconds = 10 * 60;

    @Value("${teamchallengeapi.token.signing-key}")
    private String signingKey = "afaASuughBFN1212r";

    @Value("${teamchallengeapi.token.claims.roles.key}")
    private String claimsRolesKey = "roles";

    public JwtToken generateToken(User user) {
        String token = Jwts.builder()
                .setClaims(claimsForUser(user))
                .setIssuedAt(new Date())
                .setExpiration(calculateExpirationTime())
                .signWith(SignatureAlgorithm.HS256, signingKey)
                .compact();

        return new JwtToken(token);
    }

    private Claims claimsForUser(User user) {
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put(claimsRolesKey, SecurityUtil.getAuthoritiesOfUser(user));

        return claims;
    }

    private Date calculateExpirationTime() {
        Calendar expirationTime = Calendar.getInstance();

        expirationTime.add(Calendar.SECOND, accessTokenValiditySeconds);

        return expirationTime.getTime();
    }

    public String getEmailFromToken(JwtToken token) throws SignatureException, ExpiredJwtException {
        return getClaimsFromToken(token).getSubject();
    }

    private Claims getClaimsFromToken(JwtToken token) {
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token.getToken())
                .getBody();
    }

}
