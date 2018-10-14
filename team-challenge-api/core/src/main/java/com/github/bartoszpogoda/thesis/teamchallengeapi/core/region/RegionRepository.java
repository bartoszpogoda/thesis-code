package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface RegionRepository extends CrudRepository<Region, String> {

}
