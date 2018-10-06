package com.github.bartoszpogoda.thesis.teamchallengeapi.extension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplineExtensionProvider {

    private List<DisciplineExtension> disciplineExtensions;

    public Optional<DisciplineExtension> forDiscipline(String disciplineId) {
        return disciplineExtensions.stream()
                .filter(ext -> ext.getDisciplineId().equals(disciplineId))
                .findFirst();
    }

    @Autowired
    public DisciplineExtensionProvider(List<DisciplineExtension> disciplineExtensions) {
        this.disciplineExtensions = disciplineExtensions;
    }
}
