package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer;


import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.Facility;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "PlaceTimeOffers")
public class PlaceTimeOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PlaceTimeOfferID")
    private String id;

    @Column(name = "PlaceTimeOfferStatusID")
    @Enumerated(EnumType.ORDINAL)
    private PlaceTimeOfferStatus status;

    @ManyToOne
    @JoinColumn(name = "ChallengeID")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "OfferingTeamID")
    private Team offeringTeam;

    @Column(name = "OfferedDate")
    private DateTime offeredDate;

    @ManyToOne
    @JoinColumn(name = "OfferedFacilityID")
    private Facility offeredFacility;

}
