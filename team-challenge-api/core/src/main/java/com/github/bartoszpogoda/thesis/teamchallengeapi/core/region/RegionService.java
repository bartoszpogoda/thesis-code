package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownRegionException;
import org.springframework.stereotype.Service;

@Service
public class RegionService {

    private final RegionRepository regionRepository;

    public void checkRegionExists(String regionId) throws UnknownRegionException {
        if(!regionRepository.findById(regionId).isPresent()) {
            throw new UnknownRegionException();
        }
    }

    public RegionService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

}
