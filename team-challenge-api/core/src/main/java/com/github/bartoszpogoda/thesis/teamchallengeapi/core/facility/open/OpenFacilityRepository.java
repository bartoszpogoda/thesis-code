package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.open;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.FacilityBaseRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Repository
public interface OpenFacilityRepository extends FacilityBaseRepository<OpenFacility>, CrudRepository<OpenFacility, String> {
    int removeByDisciplineIdAndId(String disciplineId, String id);

    Optional<OpenFacility> findByDisciplineIdAndId(String discplineId, String id);
}
