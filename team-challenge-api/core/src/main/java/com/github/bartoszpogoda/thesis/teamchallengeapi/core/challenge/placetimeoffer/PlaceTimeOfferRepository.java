package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceTimeOfferRepository extends CrudRepository<PlaceTimeOffer, String> {

}