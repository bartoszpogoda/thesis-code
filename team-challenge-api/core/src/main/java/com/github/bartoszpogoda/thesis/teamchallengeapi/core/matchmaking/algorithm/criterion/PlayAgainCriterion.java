package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

public class PlayAgainCriterion extends BooleanCriterion {
    public PlayAgainCriterion(boolean value) {
        super(CriterionType.PLAYAGAIN, value);
    }
}
