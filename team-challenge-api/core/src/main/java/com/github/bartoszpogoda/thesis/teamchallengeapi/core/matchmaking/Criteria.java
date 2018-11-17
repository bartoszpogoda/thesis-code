package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.BooleanCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * Holds criteria between two teams.
 *
 */
@Data
@Builder
public class Criteria {

    private List<NormalizedCriterion<NumericCriterion>> normalizedNumericCriteria;
    private List<NormalizedCriterion<BooleanCriterion>> normalizedBooleanCriteria;

}
