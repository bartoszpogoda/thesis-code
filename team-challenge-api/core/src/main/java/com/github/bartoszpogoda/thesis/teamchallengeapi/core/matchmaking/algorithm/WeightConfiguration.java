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

    public WeightConfiguration(double weightAgeDiff, double weightDistance, double weightSkillDiff,
                               boolean friendly) {


        double weightPoolLeft = 1.0;

        if (friendly) {
            weights.put(CriterionType.FRIENDLY, 0.10);
            weightPoolLeft -= 0.10;
        } else {
            // TODO it is for safety but the weight should be checked when its not configured
            // it should not be generated as criteria in Criteria Generator Service
            weights.put(CriterionType.FRIENDLY, 0.00);
        }

        // other boolean criterias here

        weights.put(CriterionType.AGE, weightPoolLeft * weightAgeDiff);
        weights.put(CriterionType.DISTANCE, weightPoolLeft * weightDistance);
        weights.put(CriterionType.SKILL, weightPoolLeft * weightSkillDiff);
    }

    public double getWeight(CriterionType type) {
        return this.weights.get(type);
    }

}
