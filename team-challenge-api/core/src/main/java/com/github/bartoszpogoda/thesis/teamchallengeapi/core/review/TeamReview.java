package com.github.bartoszpogoda.thesis.teamchallengeapi.core.review;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "TeamReviews")
public class TeamReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TeamReviewID")
    private String id;

    @ManyToOne
    @JoinColumn(name = "ChallengeID")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "ReviewingTeamID")
    private Team reviewingTeam;

    @ManyToOne
    @JoinColumn(name = "ReviewedTeamID")
    private Team reviewedTeam;

    @Column(name = "FairPlayLevel")
    private Integer fairPlayLevel;

    @Column(name = "PlayAgain")
    private boolean playAgain;

    @Column(name = "ReviewDate")
    private DateTime reviewDate;

}
