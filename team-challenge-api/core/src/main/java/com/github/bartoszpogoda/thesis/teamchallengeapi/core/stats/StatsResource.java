package com.github.bartoszpogoda.thesis.teamchallengeapi.core.stats;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.stats.model.StatsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
public class StatsResource {

    private final StatsService statsService;

    @GetMapping
    ResponseEntity<StatsDto> getStats() {
        return ResponseEntity.ok(this.statsService.getStats());
    }

    public StatsResource(StatsService statsService) {
        this.statsService = statsService;
    }

}
