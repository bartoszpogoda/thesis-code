package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

/**
 * Base class for all criterias.
 */
public abstract class Criterion {

    private CriterionType type;

    public Criterion(CriterionType type) {
        this.type = type;
    }

    public CriterionType getType() {
        return type;
    }
}


