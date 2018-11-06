package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.weight;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.Criterion;
import lombok.Data;

@Data
public class WeightedCriteria {
    private Criterion criteria;

    private double weight;
}
