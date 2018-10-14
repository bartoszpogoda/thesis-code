package com.github.bartoszpogoda.thesis.teamchallengeapi.core.extension;

import org.springframework.stereotype.Service;

/**
 * Created so the core project will run without any discipline extensions.
 *
 * This class can be removed when at least one discipline extensions should be mandatory.
 */
@Service
public class DefaultDisciplineExtension implements DisciplineExtension {

    @Override
    public String getDisciplineId() {
        return "";
    }
}
