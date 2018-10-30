package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;

@Table(name = "Regions")
@Entity
@Data
public class Region {

    @Id
    @Column(name = "RegionID")
    @NonNull
    private String id;

    @Column(name = "Name")
    @NonNull
    private String name;

    @OneToOne
    @JoinColumn(name = "CenterID")
    private Position center;

}
