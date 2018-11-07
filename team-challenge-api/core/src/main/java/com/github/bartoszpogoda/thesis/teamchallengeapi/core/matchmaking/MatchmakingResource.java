package com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.ComparisonRequestDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.SearchRequestDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.CriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search.SearchResultDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/matchmaking")
public class MatchmakingResource {

    private final MatchmakingService matchmakingService;
    private final DtoMappingService mappingService;

    @PostMapping("/comparison")
    public ResponseEntity<CriteriaDto> compare(@RequestBody @Valid ComparisonRequestDto comparisonRequest)
            throws ApiException {


        Criteria criteria = this.matchmakingService.calculateNormalizedCriteria(comparisonRequest.getHostTeamId(), comparisonRequest.getOtherTeamId());

        return ResponseEntity.ok(this.mappingService.mapToDto(criteria));
    }

    @PostMapping("/search")
    public ResponseEntity<SearchResultDto> search(@RequestBody @Valid SearchRequestDto searchRequest) throws ApiException {

        SearchResult result = this.matchmakingService.search(searchRequest.getPreferences(), searchRequest.getSearchingTeamId());

        return ResponseEntity.ok(this.mappingService.mapToDto(result));
    }

    public MatchmakingResource(MatchmakingService matchmakingService, DtoMappingService mappingService) {
        this.matchmakingService = matchmakingService;
        this.mappingService = mappingService;
    }
}
