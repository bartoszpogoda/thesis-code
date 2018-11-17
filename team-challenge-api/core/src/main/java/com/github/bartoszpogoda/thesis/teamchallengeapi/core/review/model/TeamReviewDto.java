package com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.model;

import lombok.Data;

@Data
public class TeamReviewDto {

    private String id;

    private String challengeId;

    private String reviewingTeamId;

    private String reviewedTeamId;

    private Integer fairPlayLevel;

    private boolean playAgain;

    private String reviewDate;

}

