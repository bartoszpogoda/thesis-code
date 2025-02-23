package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user;


import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Authorities")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
public class Authority {

    @Id
    @NonNull
    @Column(name = "AuthorityName", length = 50)
    @Size(max = 50)
    private String name;

    public static final Authority ADMIN = new Authority("ROLE_ADMIN");

}
