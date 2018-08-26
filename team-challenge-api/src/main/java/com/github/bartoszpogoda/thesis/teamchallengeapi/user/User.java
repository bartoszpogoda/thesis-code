package com.github.bartoszpogoda.thesis.teamchallengeapi.user;


import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@Builder
public class User {

    @Id
    @GeneratedValue
    @Column(name = "UserID")
    private String id;

    @NonNull
    @Column(name = "Email")
    private String email;

    @Column(name = "EncodedPassword")
    private String encodedPassword;

    @ManyToMany
    @JoinTable(name = "GrantedAuthorities",
            joinColumns = {@JoinColumn(name="UserID", referencedColumnName = "UserID")},
            inverseJoinColumns = {@JoinColumn(name="AuthorityName", referencedColumnName = "AuthorityName")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Authority> authorities = new HashSet<>();


}
