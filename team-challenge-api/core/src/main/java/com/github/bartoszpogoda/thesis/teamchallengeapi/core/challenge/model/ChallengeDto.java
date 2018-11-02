package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.PlaceTimeOffer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.model.PlaceTimeOfferDto;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class ChallengeDto {

    private String id;

    @NotNull(message = "Discipline for which challenge is created must be specified. ")
    private String disciplineId;

    private String challengingTeamId;

    @NotEmpty(message = "Challenged team must be specified. ")
    private String challengedTeamId;

    private int status;

    public void setStatus(ChallengeStatus status) {
        this.status = status.getValue();
    }

}
