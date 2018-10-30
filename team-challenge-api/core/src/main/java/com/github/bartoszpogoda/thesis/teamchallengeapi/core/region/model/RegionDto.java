package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import lombok.Data;

@Data
public class RegionDto {

    private String id;

    private String name;

    private PositionDto center;

}
