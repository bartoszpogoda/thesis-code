package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

/**
 * Base class for all criterias.
 */
public abstract class Criterion {

    private CriterionType type;

//    private double weight;

    public Criterion(CriterionType type) {
        this.type = type;
    }

    public CriterionType getType() {
        return type;
    }

//    public double getWeight() {
//        return weight;
//    }
//
//    public void setWeight(double weight) {
//        this.weight = weight;
//    }
}


