package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.Criterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;

public interface Normalizer<T extends Criterion> {

    NormalizedCriterion<T> normalize(T criteria);

}
