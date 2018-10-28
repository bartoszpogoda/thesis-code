package com.github.bartoszpogoda.thesis.teamchallengeapi.core.position;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "Positions")
@Data
@Builder
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PositionID")
    private String id;

    @Column(name = "Lat")
    private double lat;

    @Column(name = "Lng")
    private double lng;


}
