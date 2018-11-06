package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.TeamNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.CriteriaGeneratorService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.BooleanCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.CriterionType;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.AgeNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.BooleanCriterionNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.LinearDecayNormalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.normalization.Normalizer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.PreferencesDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.ResultDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 */
@Service
public class MatchmakingService {

    private final TeamService teamService;
    private final CriteriaGeneratorService criteriaGenerator;

    private HashMap<CriterionType, Normalizer<NumericCriterion>> numericCriterionNormalizerMap;
    private Normalizer<BooleanCriterion> booleanCriterionNormalizer;


    /**
     * Calculate match information of otherTeam relative to hostTeam.
     *
     * @param hostTeamId id of team that is performing search
     * @param otherTeamId if of opponent team
     *
     */
    public Criteria calculateCriteria(String hostTeamId, String otherTeamId) throws ApiException {
        // TODO check access

        Team hostTeam = teamService.findById(hostTeamId).orElseThrow(TeamNotFoundException::new);
        Team otherTeam = teamService.findById(otherTeamId).orElseThrow(TeamNotFoundException::new);

        List<NumericCriterion> numericCriteria = this.criteriaGenerator.generateNumeric(hostTeam, otherTeam);
        List<BooleanCriterion> booleanCriteria = this.criteriaGenerator.generateBoolean(hostTeam, otherTeam);

        List<NormalizedCriterion<NumericCriterion>> normalizedNumeric= numericCriteria.stream()
                .map(crit -> this.numericCriterionNormalizerMap.get(crit.getType()).normalize(crit))
                .collect(Collectors.toList());

        List<NormalizedCriterion<BooleanCriterion>> normaliizedBoolean= booleanCriteria.stream()
                .map(crit -> this.booleanCriterionNormalizer.normalize(crit))
                .collect(Collectors.toList());


        return Criteria.builder()
                .normalizedNumericCriteria(normalizedNumeric)
                .normalizedBooleanCriteria(normaliizedBoolean)
                .build();
    }

    /**
     * Perform matchmaking search relative to hostTeam.
     *
     * @param pref matchmaking preferences of hostTeam
     * @param hostTeamId id of team that is performing search
     *
     */
    public ResultDto search(PreferencesDto pref, String hostTeamId) throws ApiException {
        // TODO check access

        Team hostTeam = teamService.findById(hostTeamId).orElseThrow(TeamNotFoundException::new);
        List<Team> teams = teamService.getTeamsReadyForMatchmaking(hostTeam.getDisciplineId(), hostTeam.getRegionId());
        teams.remove(hostTeam);

        System.out.println(Arrays.toString(teams.toArray()));

        return null;
    };

    private void initializeNormalizers() {
        this.numericCriterionNormalizerMap = new HashMap<>();
        this.numericCriterionNormalizerMap.put(CriterionType.AGE, new AgeNormalizer());
        this.numericCriterionNormalizerMap.put(CriterionType.DISTANCE, new LinearDecayNormalizer(1, 8));

        this.booleanCriterionNormalizer = new BooleanCriterionNormalizer();
    }

    public MatchmakingService(TeamService teamService, CriteriaGeneratorService criteriaGenerator) {
        this.teamService = teamService;
        this.criteriaGenerator = criteriaGenerator;

        initializeNormalizers();
    }

}
