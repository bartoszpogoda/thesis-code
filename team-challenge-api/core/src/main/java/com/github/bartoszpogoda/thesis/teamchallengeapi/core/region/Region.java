package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "Regions")
@Entity
@Data
public class Region {

    @Id
    @Column(name = "RegionID")
    @NonNull
    private String id;

}
