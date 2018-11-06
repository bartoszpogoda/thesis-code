package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.CriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.ComparisonRequestDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.SearchRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/matchmaking")
public class MatchmakingResource {

    private final MatchmakingService matchmakingService;
    private final DtoMappingService mappingService;

    @PostMapping("/comparison")
    public ResponseEntity<CriteriaDto> compare(@RequestBody @Valid ComparisonRequestDto comparisonRequest)
            throws ApiException {


        Criteria criteria = this.matchmakingService.calculateCriteria(comparisonRequest.getHostTeamId(), comparisonRequest.getOtherTeamId());

        return ResponseEntity.ok(this.mappingService.mapToDto(criteria));
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody @Valid SearchRequestDto searchRequest) {

        System.out.println(searchRequest);

        return null;
    }

    public MatchmakingResource(MatchmakingService matchmakingService, DtoMappingService mappingService) {
        this.matchmakingService = matchmakingService;
        this.mappingService = mappingService;
    }
}
