package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "Results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ResultID")
    private String id;

    @ManyToOne
    @JoinColumn(name = "ChallengeID")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "WinnerTeamID")
    private Team winnerTeam;

    @Column(name = "WinnerPoints")
    private Integer winnerPoints;

    @Column(name = "LoserPoints")
    private Integer loserPoints;

    @ManyToOne
    @JoinColumn(name = "ReportingTeamID")
    private Team reportingTeam;

    @Column(name = "ReportedDate")
    private DateTime reportedDate;

    @Column(name = "ResultStatusID")
    @Enumerated(EnumType.ORDINAL)
    private ResultStatus status;

}
