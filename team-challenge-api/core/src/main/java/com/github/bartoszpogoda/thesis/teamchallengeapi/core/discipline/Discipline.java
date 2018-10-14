package com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "Disciplines")
@Entity
@Data
public class Discipline {

    @Id
    @Column(name = "DisciplineID")
    @NonNull
    private String id;

}
