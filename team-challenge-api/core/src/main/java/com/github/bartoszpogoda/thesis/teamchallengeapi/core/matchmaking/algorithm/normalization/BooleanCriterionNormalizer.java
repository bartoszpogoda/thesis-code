package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.BooleanCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;

public class BooleanCriterionNormalizer implements Normalizer<BooleanCriterion> {

    @Override
    public NormalizedCriterion<BooleanCriterion> normalize(BooleanCriterion criteria) {
        if(criteria.isValue()) {
            return new NormalizedCriterion<>(1, criteria);
        } else {
            return new NormalizedCriterion<>(0, criteria);
        }
    }
}
