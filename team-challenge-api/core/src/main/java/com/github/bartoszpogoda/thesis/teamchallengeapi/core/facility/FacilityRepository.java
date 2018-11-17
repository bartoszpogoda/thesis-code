package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface FacilityRepository extends CrudRepository<Facility, String>, JpaSpecificationExecutor<Facility> {

    int removeById(String id);

}
