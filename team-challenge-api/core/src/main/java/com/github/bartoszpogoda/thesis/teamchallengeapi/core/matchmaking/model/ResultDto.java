package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Data;

import java.util.Map;

@Data
public class ResultDto {

    private Map<Team, ScoreDto> scores;

}
