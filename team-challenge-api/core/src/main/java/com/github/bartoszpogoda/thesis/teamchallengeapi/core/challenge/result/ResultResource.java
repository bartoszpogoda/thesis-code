package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.model.ResultDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.InternalServerException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.ResultNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationCurrentRequest;

@RestController
@RequestMapping("/challenges/{challengeId}/result")
public class ResultResource {

    private final ResultService resultService;
    private final DtoMappingService mappingService;

    @PostMapping
    public ResponseEntity<ResultDto> report(@PathVariable String challengeId, @RequestBody @Valid ResultDto form) throws Exception {

        return resultService.saveResult(challengeId, form)
                .map(mappingService::mapToDto)
                .map(result -> ResponseEntity.created(createLocationCurrentRequest()).body(result))
                .orElseThrow(InternalServerException::new);
    }

    @GetMapping
    public ResponseEntity<ResultDto> get(@PathVariable String challengeId) throws ApiException {
        return resultService.get(challengeId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(ResultNotFoundException::new);
    }

    @PostMapping("/confirmation")
    public ResponseEntity<ResultDto> confirm(@PathVariable String challengeId) throws ApiException {
        Result confirmedResult = resultService.confirm(challengeId);
        return ResponseEntity.ok(mappingService.mapToDto(confirmedResult));
    }

    @PostMapping("/rejection")
    public ResponseEntity<ResultDto> reject(@PathVariable String challengeId) throws ApiException {
        Result confirmedResult = resultService.reject(challengeId);
        return ResponseEntity.ok(mappingService.mapToDto(confirmedResult));
    }

    public ResultResource(ResultService placeTimerOfferService, DtoMappingService mappingService) {
        this.resultService = placeTimerOfferService;
        this.mappingService = mappingService;
    }

}
