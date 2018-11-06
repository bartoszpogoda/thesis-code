package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class DistanceCriterion extends NumericCriterion {

    public DistanceCriterion(double value) {
        super(CriterionType.DISTANCE, value);
    }

}
