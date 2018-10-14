package com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface DisciplineRepository extends CrudRepository<Discipline, String> {

}
