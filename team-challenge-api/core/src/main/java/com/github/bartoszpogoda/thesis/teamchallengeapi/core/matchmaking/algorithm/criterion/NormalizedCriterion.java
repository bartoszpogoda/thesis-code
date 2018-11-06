package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NormalizedCriterion<T extends Criterion> {

    private double normalizedValue;

    private T originalCriteria;

}
