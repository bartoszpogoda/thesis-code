package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.model.PlaceTimeOfferDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.Facility;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.FacilityService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceTimeOfferService {

    private final PlaceTimeOfferRepository placeTimeOfferRepository;
    private final FacilityService facilityService;
    private final ChallengeService challengeService;
    private final PlayerService playerService;


    public Optional<PlaceTimeOffer> saveOffer(Team currentTeam, Challenge challenge, PlaceTimeOfferDto placeTimeOfferDto) throws ApiException {

        Facility facility = facilityService.getById(placeTimeOfferDto.getOfferedFacilityId()).orElseThrow(FacilityNotFoundException::new);

        PlaceTimeOffer placeTimeOffer = PlaceTimeOffer.builder()
                .challenge(challenge)
                .offeringTeam(currentTeam)
                .offeredFacility(facility)
                .offeredDate(new DateTime(placeTimeOfferDto.getOfferedDate()))
                .status(PlaceTimeOfferStatus.Pending).build();

        return Optional.ofNullable(this.placeTimeOfferRepository.save(placeTimeOffer));

    }

    public List<PlaceTimeOffer> getOffers(String challengeId) throws ApiException {
        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        List<PlaceTimeOffer> placeTimeOffers = challenge.getPlaceTimeOffers();
        placeTimeOffers.sort(Comparator.comparing(PlaceTimeOffer::getId));

        return placeTimeOffers;
    }

    public Optional<PlaceTimeOffer> saveOffer(String challengeId, PlaceTimeOfferDto form) throws ApiException {

        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        return this.saveOffer(currentTeam, challenge, form);
    }

    @Transactional
    public PlaceTimeOffer accept(String challengeId, String id) throws ApiException {
        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        PlaceTimeOffer placeTimeOffer = this.placeTimeOfferRepository.findById(id).orElseThrow(PlaceTimeOfferNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(placeTimeOffer.getOfferingTeam().equals(currentTeam)) {
            throw new InvalidOperationException("Your team offers can not be accepted by you.");
        }

        if(!challenge.equals(placeTimeOffer.getChallenge())) {
            throw new PlaceTimeOfferNotFoundException();
        }

        challenge.getPlaceTimeOffers().stream().filter(pto -> pto.getStatus().equals(PlaceTimeOfferStatus.Pending)).forEach(pto -> pto.setStatus(PlaceTimeOfferStatus.Rejected));

        placeTimeOffer.setStatus(PlaceTimeOfferStatus.Accepted);
        challenge.setStatus(ChallengeStatus.Accepted);

        return placeTimeOffer;
    }

    @Transactional
    public PlaceTimeOffer cancel(String challengeId, String id) throws ApiException {
        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        PlaceTimeOffer placeTimeOffer = this.placeTimeOfferRepository.findById(id).orElseThrow(PlaceTimeOfferNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(!placeTimeOffer.getOfferingTeam().equals(currentTeam)) {
            throw new InvalidOperationException("You can't cancel opponent offers");
        }

        if(!challenge.equals(placeTimeOffer.getChallenge())) {
            throw new PlaceTimeOfferNotFoundException();
        }

        placeTimeOffer.setStatus(PlaceTimeOfferStatus.Cancelled);

        return placeTimeOffer;
    }

    @Transactional
    public PlaceTimeOffer reject(String challengeId, String id) throws ApiException {
        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        PlaceTimeOffer placeTimeOffer = this.placeTimeOfferRepository.findById(id).orElseThrow(PlaceTimeOfferNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(placeTimeOffer.getOfferingTeam().equals(currentTeam)) {
            throw new InvalidOperationException("You can't reject your offers");
        }

        if(!challenge.equals(placeTimeOffer.getChallenge())) {
            throw new PlaceTimeOfferNotFoundException();
        }

        placeTimeOffer.setStatus(PlaceTimeOfferStatus.Rejected);

        return placeTimeOffer;
    }

    public PlaceTimeOfferService(PlaceTimeOfferRepository placeTimeOfferRepository, FacilityService facilityService, ChallengeService challengeService, PlayerService playerService) {
        this.placeTimeOfferRepository = placeTimeOfferRepository;
        this.facilityService = facilityService;
        this.challengeService = challengeService;
        this.playerService = playerService;
    }
}
