package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.model.ChallengeDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.InternalServerException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/challenges")
public class ChallengeResource {

    private final ChallengeService challengeService;
    private final DtoMappingService mappingService;

    @GetMapping
    public ResponseEntity<CustomPage<ChallengeDto>> query(Pageable pageable,
                                                          @RequestParam(required = false) String teamId,
                                                          @RequestParam(required = false) boolean active,
                                                          @RequestParam(required = false) boolean past)
            throws ApiException {

        Page<ChallengeDto> challenges = challengeService.query(pageable, teamId, active, past).map(mappingService::mapToDto);
        return ResponseEntity.ok(PaginationUtil.toCustomPage(challenges));
    }

    @PostMapping
    public ResponseEntity<ChallengeDto> create(@RequestBody @Valid ChallengeDto challengeDto) throws ApiException {

        return challengeService.create(challengeDto)
                .map(mappingService::mapToDto)
                .map(challenge -> ResponseEntity.created(createLocationByAddingIdToCurentRequest(challenge.getId())).body(challenge))
                .orElseThrow(InternalServerException::new);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeDto> get(@PathVariable String id) throws ApiException {
        return challengeService.getById(id)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(InternalServerException::new);
    }

    @PostMapping("/{id}/rejection")
    public ResponseEntity<ChallengeDto> reject(@PathVariable String id) throws ApiException {
        return challengeService.reject(id)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(InternalServerException::new);
    }

    @PostMapping("/{id}/cancellation")
    public ResponseEntity<ChallengeDto> cancel(@PathVariable String id) throws ApiException {
        return challengeService.cancel(id)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(InternalServerException::new);
    }

    public ChallengeResource(ChallengeService challengeService, DtoMappingService mappingService) {
        this.challengeService = challengeService;
        this.mappingService = mappingService;
    }

}
