package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.TeamNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.aggregation.WeightedCriteriaAggregator;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.BooleanCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.CriterionType;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.AgeNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.BooleanCriterionNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.LinearDecayNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.Normalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.weight.WeightedCriteria;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.PreferencesDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 *
 */
@Service
public class MatchmakingService {

    private final TeamService teamService;
    private final CriteriaGeneratorService criteriaGenerator;
    private final WeighteningService weighteningService;
    private final WeightedCriteriaAggregator weightedCriteriaAggregator;
    private final TeamFilteringService teamFilteringService;

    private HashMap<CriterionType, Normalizer<NumericCriterion>> numericCriterionNormalizerMap;
    private Normalizer<BooleanCriterion> booleanCriterionNormalizer;


    /**
     * Calculate match information of otherTeam relative to hostTeam.
     *
     * @param hostTeamId id of team that is performing search
     * @param otherTeamId if of opponent team
     *
     */
    public Criteria calculateNormalizedCriteria(String hostTeamId, String otherTeamId) throws ApiException {
        // TODO check access

        Team hostTeam = teamService.findById(hostTeamId).orElseThrow(TeamNotFoundException::new);
        Team otherTeam = teamService.findById(otherTeamId).orElseThrow(TeamNotFoundException::new);

        return calculateNormalizedCriteria(hostTeam, otherTeam);
    }

    private Criteria calculateNormalizedCriteria(Team hostTeam, Team otherTeam) {
        List<NumericCriterion> numericCriteria = this.criteriaGenerator.generateNumeric(hostTeam, otherTeam);
        List<BooleanCriterion> booleanCriteria = this.criteriaGenerator.generateBoolean(hostTeam, otherTeam);

        List<NormalizedCriterion<NumericCriterion>> normalizedNumeric = numericCriteria.stream()
                .map(crit -> this.numericCriterionNormalizerMap.get(crit.getType()).normalize(crit))
                .collect(Collectors.toList());

        List<NormalizedCriterion<BooleanCriterion>> normalizedBoolean = booleanCriteria.stream()
                .map(crit -> this.booleanCriterionNormalizer.normalize(crit))
                .collect(Collectors.toList());


        return Criteria.builder()
                .normalizedNumericCriteria(normalizedNumeric)
                .normalizedBooleanCriteria(normalizedBoolean)
                .build();
    }

    /**
     * Perform matchmaking search relative to hostTeam.
     *
     * @param pref matchmaking preferences of hostTeam
     * @param hostTeamId id of team that is performing search
     *
     */
    public SearchResult search(PreferencesDto pref, String hostTeamId) throws ApiException {
        // TODO check access

        Team hostTeam = teamService.findById(hostTeamId).orElseThrow(TeamNotFoundException::new);
        List<Team> teams = teamService.getTeamsReadyForMatchmaking(hostTeam.getDisciplineId(), hostTeam.getRegionId());

        teams = teamFilteringService.filter(hostTeam, teams);

        // pref to Configuration
        WeightConfiguration configuration = new WeightConfiguration(pref.getWeightAgeDiff(),
                pref.getWeightDistance(), pref.getWeightSkillDiff(), pref.isFairPlay(), pref.isPlayAgain(), pref.isBigActivity());

        List<ScoredTeam> result = new ArrayList<>();

        for(Team otherTeam : teams) {
            Criteria criteria = calculateNormalizedCriteria(hostTeam, otherTeam);

            List<WeightedCriteria<NumericCriterion>> numericCriterionWeights
                    = weighteningService.weight(configuration, criteria.getNormalizedNumericCriteria());
            List<WeightedCriteria<BooleanCriterion>> booleanCriterionWeights
                    = weighteningService.weight(configuration, criteria.getNormalizedBooleanCriteria());

            double totalScore = this.weightedCriteriaAggregator.aggregate(Stream.concat(numericCriterionWeights.stream(),
                    booleanCriterionWeights. stream()));

            result.add(new ScoredTeam(otherTeam, totalScore, criteria));
        }

        result.sort(Comparator.comparingDouble(ScoredTeam::getTotalScore).reversed());

        return new SearchResult(result);
    }

    private void initializeNormalizers() {
        this.numericCriterionNormalizerMap = new HashMap<>();
        this.numericCriterionNormalizerMap.put(CriterionType.AGE, new AgeNormalizer());
        this.numericCriterionNormalizerMap.put(CriterionType.DISTANCE, new LinearDecayNormalizer(1, 8));
        this.numericCriterionNormalizerMap.put(CriterionType.SKILL, new LinearDecayNormalizer(3, 10));

        this.booleanCriterionNormalizer = new BooleanCriterionNormalizer();
    }

    public MatchmakingService(TeamService teamService, CriteriaGeneratorService criteriaGenerator, WeighteningService weighteningService, WeightedCriteriaAggregator weightedCriteriaAggregator, TeamFilteringService teamFilteringService) {
        this.teamService = teamService;
        this.criteriaGenerator = criteriaGenerator;
        this.weighteningService = weighteningService;
        this.weightedCriteriaAggregator = weightedCriteriaAggregator;
        this.teamFilteringService = teamFilteringService;

        initializeNormalizers();
    }

}
