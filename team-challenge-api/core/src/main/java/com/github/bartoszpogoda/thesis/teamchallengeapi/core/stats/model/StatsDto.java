package com.github.bartoszpogoda.thesis.teamchallengeapi.core.stats.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatsDto {

    private long teams;

    private long facilities;

    private long finishedChallenges;

}
