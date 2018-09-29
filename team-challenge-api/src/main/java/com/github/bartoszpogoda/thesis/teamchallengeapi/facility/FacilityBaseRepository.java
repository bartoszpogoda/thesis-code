package com.github.bartoszpogoda.thesis.teamchallengeapi.facility;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.util.List;

@NoRepositoryBean
public interface FacilityBaseRepository<T extends Facility> extends Repository<T, String> {

    List<T> findAllByDisciplineIdEquals(String disciplineId);
}