package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends CrudRepository<Team, String> {

    Page<Team> findByDisciplineIdAndRegionIdAndNameContainingIgnoreCase(Pageable pageable, String disciplineId, String regionId, String nameFragment);

    Page<Team> findAllByDisciplineIdAndRegionId(Pageable pageable, String disciplineId, String regionId);

    Optional<Team> findByIdAndDisciplineId(String id, String disciplineId);

    Optional<Team> findByIdAndDisciplineIdAndRegionId(String id, String disciplineId, String regionId);
}
