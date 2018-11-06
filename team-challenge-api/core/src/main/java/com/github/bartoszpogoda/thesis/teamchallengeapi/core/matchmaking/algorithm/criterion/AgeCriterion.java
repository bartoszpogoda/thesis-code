package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion;

import lombok.ToString;

@ToString(callSuper = true)
public class AgeCriterion extends NumericCriterion {

    private double hostTeamAvgAge;

    private double otherTeamAvgAge;

    public AgeCriterion(double ageDifference, double hostTeamAvgAge, double otherTeamAvgAge) {
        super(CriterionType.AGE, ageDifference);

        this.hostTeamAvgAge = hostTeamAvgAge;
        this.otherTeamAvgAge = otherTeamAvgAge;
    }

    public double getHostTeamAvgAge() {
        return hostTeamAvgAge;
    }

    public double getOtherTeamAvgAge() {
        return otherTeamAvgAge;
    }
}
