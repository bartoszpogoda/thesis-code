package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import lombok.Data;


@Data
public class FacilityDto {

    private String id;

    private String name;

    private String address;

    private String disciplineId;

    private String regionId;

    private PositionDto position;

    private boolean lighting;

    private String surfaceType;

    private int playingSpots;

    private String description;

    private int tokenPrice;

}
