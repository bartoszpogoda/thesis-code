package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private String id;

    @NonNull
    @Column(name = "Email")
    private String email;

    @Column(name = "EncodedPassword")
    @JsonIgnore
    private String encodedPassword;

    @Column(name = "Fullname")
    private String fullName;

    @ManyToMany
    @JoinTable(name = "GrantedAuthorities",
            joinColumns = {@JoinColumn(name="UserID", referencedColumnName = "UserID")},
            inverseJoinColumns = {@JoinColumn(name="AuthorityName", referencedColumnName = "AuthorityName")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Authority> authorities = new HashSet<>();


}
