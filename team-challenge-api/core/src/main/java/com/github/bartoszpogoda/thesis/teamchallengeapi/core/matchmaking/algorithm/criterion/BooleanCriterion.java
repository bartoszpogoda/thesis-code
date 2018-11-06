package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public abstract class BooleanCriterion extends Criterion {

    protected boolean value;

    public BooleanCriterion(CriterionType type, boolean value) {
        super(type);
        this.value = value;
    }

    public boolean isValue() {
        return value;
    }

    public void setValue(boolean value) {
        this.value = value;
    }
}
