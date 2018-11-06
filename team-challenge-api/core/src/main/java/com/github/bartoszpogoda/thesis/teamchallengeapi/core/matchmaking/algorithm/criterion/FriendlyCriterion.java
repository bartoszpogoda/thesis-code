package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class FriendlyCriterion extends BooleanCriterion {

    public FriendlyCriterion(boolean value) {
        super(CriterionType.FRIENDLY, value);
    }

}
