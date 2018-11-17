package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.Criterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.weight.WeightedCriteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeighteningService {

    public <T extends Criterion> List<WeightedCriteria<T>> weight(WeightConfiguration config, List<NormalizedCriterion<T>> criteria) {

        return criteria.stream()
                .map(criterion -> new WeightedCriteria<T>(criterion, config.getWeight(criterion.getOriginalCriteria().getType())))
                .collect(Collectors.toList());
    }

}
