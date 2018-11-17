package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.weight;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.Criterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeightedCriteria<T extends Criterion> {
    private NormalizedCriterion<T> criteria;

    private double weight;
}
