package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison;

import lombok.Data;

import java.util.List;

@Data
public class CriteriaDto {

    private List<NumericCriteriaDto> numericCriteria;
    private List<BooleanCriteriaDto> booleanCriteria;


}


