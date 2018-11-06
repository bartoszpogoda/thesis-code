package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class ExperienceCriterion extends NumericCriterion {
    public ExperienceCriterion(double value) {
        super(CriterionType.EXPERIENCE, value);
    }
}
