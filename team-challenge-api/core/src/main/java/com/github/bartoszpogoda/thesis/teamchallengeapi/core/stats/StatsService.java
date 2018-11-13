package com.github.bartoszpogoda.thesis.teamchallengeapi.core.stats;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeRepository;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.FacilityRepository;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.stats.model.StatsDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.TeamRepository;
import org.springframework.stereotype.Service;

@Service
public class StatsService {

    private final TeamRepository teamRepository;
    private final FacilityRepository facilityRepository;
    private final ChallengeRepository challengeRepository;

    public StatsDto getStats() {

        // TODO should be done Cacheable

        return StatsDto.builder()
                .teams(this.teamRepository.count())
                .facilities(this.facilityRepository.count())
                .finishedChallenges(countFinishedChallenges())
                .build();

    }

    private long countFinishedChallenges() {
        return this.challengeRepository.count((root, query, builder) -> builder.equal(root.get("status"), ChallengeStatus.Finished));
    }

    public StatsService(TeamRepository teamRepository, FacilityRepository facilityRepository, ChallengeRepository challengeRepository) {
        this.teamRepository = teamRepository;
        this.facilityRepository = facilityRepository;
        this.challengeRepository = challengeRepository;
    }

}
