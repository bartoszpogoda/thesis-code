package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends CrudRepository<Team, String>, JpaSpecificationExecutor<Team> {

    Optional<Team> findById(String id);

    List<Team> findByRegionIdAndDisciplineIdAndActiveIsTrue(String regionId, String disciplineId);
}
