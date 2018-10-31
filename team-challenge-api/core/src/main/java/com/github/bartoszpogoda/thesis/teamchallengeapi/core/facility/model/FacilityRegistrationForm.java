package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class FacilityRegistrationForm {

    @Size(min = 3, max = 30, message = "Facility name must be between 3 and 30 characters long.")
    private String name;

    @NotNull(message = "Discipline for which player registers must be specified. ")
    private String disciplineId;

    @NotNull(message = "Region for which player registers must be specified. ")
    private String regionId;

    @NotNull(message = "Facility position must be specified. ")
    private PositionDto position;

    private boolean lighting;

    private String surfaceType;

    private int playingSpots;

    private String description;

}
