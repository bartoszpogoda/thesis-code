package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownRegionException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService {

    private final RegionRepository regionRepository;

    public void checkRegionExists(String regionId) throws UnknownRegionException {
        if(!regionRepository.findById(regionId).isPresent()) {
            throw new UnknownRegionException();
        }
    }

    public List<Region> getAll() {
        return this.regionRepository.findAll();
    }

    public RegionService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

}
