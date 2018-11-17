package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search;

import lombok.Data;

import java.util.List;

@Data
public class SearchResultDto {
    private List<ScoredTeamDto> results;

}



