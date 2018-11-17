package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class FairPlayCriterion extends BooleanCriterion {

    public FairPlayCriterion(boolean value) {
        super(CriterionType.FAIRPLAY, value);
    }

}
