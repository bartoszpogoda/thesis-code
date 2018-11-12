package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.model;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.PlaceTimeOfferStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model.FacilityDto;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class PlaceTimeOfferDto {

    private String id;

    private String offeringTeamId;

    // TODO check if is in future,
    @NotEmpty(message = "Offer date can not be empty")
//    @Pattern(regexp = "[0-9]{4}-[0-9]{2}-[0-9]{2}", message = "Date must be in YYYY-MM-dd format. ")
    private String offeredDate;

    @NotEmpty(message = "Offered facility id can not be empty.")
    private String offeredFacilityId;

    private FacilityDto offeredFacility;

    private int status;

    public void setStatus(PlaceTimeOfferStatus status) {
        this.status = status.getValue();
    }


}
