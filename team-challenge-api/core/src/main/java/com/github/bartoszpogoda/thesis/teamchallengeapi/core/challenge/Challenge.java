package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.PlaceTimeOffer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.Result;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "Challenges")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ChallengeID")
    private String id;

    @Column(name = "DisciplineID")
    @JsonIgnore
    private String disciplineId;

    @Column(name = "ChallengeStatusID")
    @Enumerated(EnumType.ORDINAL)
    private ChallengeStatus status;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<PlaceTimeOffer> placeTimeOffers;

    @OneToOne(mappedBy = "challenge")
    private Result result;

    @ManyToOne
    @JoinColumn(name = "ChallengingTeamID")
    private Team challengingTeam;

    @ManyToOne
    @JoinColumn(name = "ChallengedTeamID")
    private Team challengedTeam;

    @Column(name = "CreationDate")
    private DateTime creationDate;


}
