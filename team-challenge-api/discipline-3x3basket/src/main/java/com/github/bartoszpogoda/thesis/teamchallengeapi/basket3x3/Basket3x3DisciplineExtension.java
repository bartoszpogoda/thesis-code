package com.github.bartoszpogoda.thesis.teamchallengeapi.basket3x3;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.extension.DisciplineExtension;
import org.springframework.stereotype.Service;

@Service
public class Basket3x3DisciplineExtension implements DisciplineExtension {

    @Override
    public String getDisciplineId() {
        return "3x3basket";
    }

    public Basket3x3DisciplineExtension() {

    }
}
