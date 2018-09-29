package com.github.bartoszpogoda.thesis.teamchallengeapi.discipline;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface DisciplineRepository extends CrudRepository<Discipline, String> {

}
