package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import org.springframework.stereotype.Service;

@Service
public class RegionService {

    private final RegionRepository regionRepository;

    public boolean regionExists(String disciplineId) {
        return regionRepository.findById(disciplineId).isPresent();
    }

    public RegionService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

}
