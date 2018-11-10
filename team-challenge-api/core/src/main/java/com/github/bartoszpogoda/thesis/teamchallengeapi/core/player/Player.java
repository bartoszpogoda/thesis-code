package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
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

    @ManyToOne
    @JoinColumn(name = "TeamID")
    private Team team;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;

    @Column(name = "RegionID")
    @JsonIgnore
    private String regionId;

    @Column(name = "Height")
    private int height;

    @Column(name = "Skill")
    private int skill;

}
