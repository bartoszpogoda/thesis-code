package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Facilities")
@Data
@Builder
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FacilityID")
    private String id;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;

    @Column(name = "RegionID")
    private String regionId;

    @Column(name = "Name")
    private String name;

    @OneToOne
    @JoinColumn(name = "PositionID")
    private Position position;

    @Column(name = "Lighting")
    private boolean lighting;

    @Column(name = "SurfaceType")
    private String surfaceType;

    @Column(name = "PlayingSpots")
    private Integer playingSpots;

    @Column(name = "Description")
    private String description;

    @Column(name = "TokenPrice")
    private Integer tokenPrice;


}
