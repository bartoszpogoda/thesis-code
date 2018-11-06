package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;

public class LinearDecayNormalizer implements Normalizer<NumericCriterion> {

    private double offset;
    private double scale;

    /**
     * Constructs linear decay normalizer for linear differences
     *
     * @param offset maximum difference that will be scored with max (1) score
     * @param scale difference at which the score will be equal to 0.5
     */
    public LinearDecayNormalizer(double offset, double scale) {
        this.offset = offset;
        this.scale = scale;
    }

    @Override
    public NormalizedCriterion<NumericCriterion> normalize(NumericCriterion criteria) {

        double differenceWithOffset = (Math.abs(criteria.getValue()) - offset);
        differenceWithOffset = differenceWithOffset > 0 ? differenceWithOffset : 0;

        double score = 1 - differenceWithOffset / (scale / 0.5);
        score = score > 0 ? score : 0;

        return new NormalizedCriterion<>(score, criteria);
    }
}
