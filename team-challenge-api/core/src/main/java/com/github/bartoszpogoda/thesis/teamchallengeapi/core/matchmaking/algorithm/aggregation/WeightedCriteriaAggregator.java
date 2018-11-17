package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.aggregation;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.weight.WeightedCriteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class WeightedCriteriaAggregator {

    public double aggregate(List<WeightedCriteria> weightedCriteria) {
        return aggregate(weightedCriteria.stream());
    }

    public double aggregate(Stream<WeightedCriteria> stream) {
        return stream.mapToDouble(crit -> crit.getWeight() * crit.getCriteria().getNormalizedValue()).sum();
    }

}
