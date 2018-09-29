package com.github.bartoszpogoda.thesis.teamchallengeapi.discipline;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "Disciplines")
@Entity
@Data
@EqualsAndHashCode
public class Discipline {

    @Id
    @Column(name = "DisciplineID")
    @NonNull
    private String id;

}
