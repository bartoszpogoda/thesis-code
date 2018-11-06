package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.CriterionType;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
public class WeightConfiguration {

    Map<CriterionType, Double> weights = new HashMap<>();

    public WeightConfiguration(double weightAgeDiff, double weightDistance, double weightExperienceDiff,
                               boolean friendly) {


        double weightPoolLeft = 1.0;

        if(friendly) {
            weights.put(CriterionType.FRIENDLY, 0.10);
            weightPoolLeft -= 0.10;
        }

        // other boolean criterias here

        weights.put(CriterionType.AGE, weightPoolLeft * weightAgeDiff);
        weights.put(CriterionType.DISTANCE, weightPoolLeft * weightDistance);
        weights.put(CriterionType.EXPERIENCE, weightPoolLeft * weightExperienceDiff);
    }

    public double getWeight(CriterionType type) {
        return this.weights.get(type);
    }

}
