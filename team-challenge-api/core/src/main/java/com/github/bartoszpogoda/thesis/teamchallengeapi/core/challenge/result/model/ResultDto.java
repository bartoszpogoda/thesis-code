package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.ResultStatus;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ResultDto {

    private String id;

    @NotEmpty
    private String winnerTeamId;

    @NotNull
    private Integer winnerPoints;

    @NotNull
    private Integer loserPoints;

    private String reportingTeamId;

    private String reportedDate;

    private int status;

    public void setStatus(ResultStatus status) {
        this.status = status.getValue();
    }

}
