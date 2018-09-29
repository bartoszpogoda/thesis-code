package com.github.bartoszpogoda.thesis.teamchallengeapi.discipline;

import org.springframework.stereotype.Service;

@Service
public class DisciplineService {

    private final DisciplineRepository disciplineRepository;

    public boolean disciplineExists(String disciplineId) {
        return disciplineRepository.findById(disciplineId).isPresent();
    }

    public DisciplineService(DisciplineRepository disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }
}
