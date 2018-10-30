package com.github.bartoszpogoda.thesis.teamchallengeapi.core.region;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.model.RegionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/regions")
public class RegionResource {

    private RegionService regionService;

    private DtoMappingService mappingService;

    @GetMapping
    public ResponseEntity<List<RegionDto>> getAll() {
        List<RegionDto> regionDtos = this.regionService.getAll().stream().map(mappingService::mapToDto).collect(Collectors.toList());

        return ResponseEntity.ok(regionDtos);
    }

    public RegionResource(RegionService regionService, DtoMappingService mappingService) {
        this.regionService = regionService;
        this.mappingService = mappingService;
    }

}
