package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.AgeCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;

public class AgeNormalizer implements Normalizer<NumericCriterion> {

    private LinearDecayNormalizer bothJunior = new LinearDecayNormalizer(1, 3);
    private LinearDecayNormalizer bothSenior = new LinearDecayNormalizer(3, 10);
    private LinearDecayNormalizer juniorAndSenior = new LinearDecayNormalizer(1, 6);

    private static final double SENIOR_AGE = 19;

    @Override
    public NormalizedCriterion<NumericCriterion> normalize(NumericCriterion criteria) {

        if(criteria instanceof AgeCriterion) {
            AgeCriterion ageCriterion = AgeCriterion.class.cast(criteria);

            if(ageCriterion.getHostTeamAvgAge() >= SENIOR_AGE && ageCriterion.getOtherTeamAvgAge() >= SENIOR_AGE) {
                return bothSenior.normalize(criteria);
            } else if(ageCriterion.getHostTeamAvgAge() < SENIOR_AGE && ageCriterion.getOtherTeamAvgAge() < SENIOR_AGE) {
                return bothJunior.normalize(criteria);
            } else {
                return juniorAndSenior.normalize(criteria);
            }
        }

        return null;
    }
}
