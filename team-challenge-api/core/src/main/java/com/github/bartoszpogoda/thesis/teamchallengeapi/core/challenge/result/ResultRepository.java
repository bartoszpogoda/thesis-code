package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.PlaceTimeOffer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends CrudRepository<Result, String> {

}