package com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownDisciplineException;
import org.springframework.stereotype.Service;

@Service
public class DisciplineService {

    private final DisciplineRepository disciplineRepository;

    public void checkDisciplineExists(String disciplineId) throws UnknownDisciplineException {
        if(!disciplineRepository.findById(disciplineId).isPresent()) {
            throw new UnknownDisciplineException();
        }
    }

    public DisciplineService(DisciplineRepository disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }
}
