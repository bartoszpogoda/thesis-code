package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Teams")
@Data
@Builder
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TeamID")
    private String id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ManagerID")
    private Player manager;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Player> players;

    @OneToOne
    @JoinColumn(name = "HomeID")
    private Position home;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;

    @Column(name = "RegionID")
    @JsonIgnore
    private String regionId;

    @Column(name = "Name")
    private String name;

    @Column(name = "Active")
    private boolean active;

    @Column(name = "Balance")
    private Integer balance;

    @Column(name = "ImagePath")
    private String imagePath;

}
