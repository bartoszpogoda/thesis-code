package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class OpenFacilityRegistrationForm {

    @Size(min = 3, max = 20, message = "Facility name must be between 3 and 20 characters long.")
    private String name;

}
