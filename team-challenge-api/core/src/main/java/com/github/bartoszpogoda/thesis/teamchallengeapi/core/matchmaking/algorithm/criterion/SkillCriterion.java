package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class SkillCriterion extends NumericCriterion {
    public SkillCriterion(double value, double origin) {
        super(CriterionType.SKILL, value, origin);
    }
}
