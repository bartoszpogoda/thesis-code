package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.ScoredTeam;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchResult {

    private List<ScoredTeam> results;

    // time?

}
