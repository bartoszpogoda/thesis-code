package com.github.bartoszpogoda.thesis.teamchallengeapi.facility;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Facilities")
@Data
public abstract class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FacilityID")
    private String id;

    @Column(name = "Name")
    private String name;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;


}
