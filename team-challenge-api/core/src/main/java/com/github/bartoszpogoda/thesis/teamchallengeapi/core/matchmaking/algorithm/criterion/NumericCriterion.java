package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public abstract class NumericCriterion extends Criterion {

    protected double value;

    protected double origin;

    public NumericCriterion(CriterionType type, double value) {
        super(type);
        this.value = value;
    }

    public NumericCriterion(CriterionType type, double value, double origin) {
        this(type, value);
        this.origin = origin;
    }

}
