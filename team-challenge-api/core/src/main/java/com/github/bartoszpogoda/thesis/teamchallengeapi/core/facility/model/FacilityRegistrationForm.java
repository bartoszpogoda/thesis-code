package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class FacilityRegistrationForm {

    @Size(min = 3, max = 30, message = "Facility name must be between 3 and 30 characters long.")
    private String name;

    @NotEmpty
    @Size(min = 3, max = 32, message = "Address must be between 3 and 32 characters long")
    private String address;

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
