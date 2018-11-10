package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class SkillCriterion extends NumericCriterion {
    public SkillCriterion(double value) {
        super(CriterionType.SKILL, value);
    }
}
