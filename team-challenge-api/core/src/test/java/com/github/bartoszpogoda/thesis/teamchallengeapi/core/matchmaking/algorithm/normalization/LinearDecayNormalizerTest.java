package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.DistanceCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;
import org.junit.Test;

import static org.junit.Assert.*;

public class LinearDecayNormalizerTest {

    @Test
    public void shouldNormalizeWhenCriteriumInOffsetRange() {
        // given
        LinearDecayNormalizer normalizer = new LinearDecayNormalizer(15, 30);
        DistanceCriterion distanceCriterion = new DistanceCriterion(14);

        // when
        NormalizedCriterion<NumericCriterion> normalized = normalizer.normalize(distanceCriterion);

        // then
        assertEquals(1, normalized.getNormalizedValue(), 0.01);
    }

    @Test
    public void shouldNormalizeWhenCriteriumEqualToScale() {
        // given
        LinearDecayNormalizer normalizer = new LinearDecayNormalizer(0, 20);
        DistanceCriterion distanceCriterion = new DistanceCriterion(20);

        // when
        NormalizedCriterion<NumericCriterion> normalized = normalizer.normalize(distanceCriterion);

        // then
        assertEquals(0.5, normalized.getNormalizedValue(), 0.01);
    }

    @Test
    public void shouldNormalizeCorrectly() {
        // given
        LinearDecayNormalizer normalizer = new LinearDecayNormalizer(12, 15);
        DistanceCriterion distanceCriterion = new DistanceCriterion(20);

        // when
        NormalizedCriterion<NumericCriterion> normalized = normalizer.normalize(distanceCriterion);

        // then
        assertEquals(0.7333, normalized.getNormalizedValue(), 0.01);
    }

}