package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.open;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.Facility;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "OpenFacilities")
@Data
public class OpenFacility extends Facility {

    @Column(name = "Temp")
    private String temp;
}
