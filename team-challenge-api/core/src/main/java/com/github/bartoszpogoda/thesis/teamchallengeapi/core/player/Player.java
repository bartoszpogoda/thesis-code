package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Players")
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PlayerID")
    private String id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;

    @Column(name = "Height")
    private int height;

    @Column(name = "YearsOfExperience")
    private int yearsOfExperience;

}
