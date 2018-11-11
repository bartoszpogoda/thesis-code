package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownRegionException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegionService {

    private final RegionRepository regionRepository;

    public void checkRegionExists(String regionId) throws UnknownRegionException {
        if(!regionRepository.findById(regionId).isPresent()) {
            throw new UnknownRegionException();
        }
    }

    public Optional<Region> getById(String regionId) {
        return this.regionRepository.findById(regionId);
    }

    public List<Region> getAll() {
        return this.regionRepository.findAll();
    }

    public RegionService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

}
