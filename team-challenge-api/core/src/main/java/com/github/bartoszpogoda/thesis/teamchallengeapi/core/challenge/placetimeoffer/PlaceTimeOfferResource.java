package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.model.PlaceTimeOfferDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.InternalServerException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/challenges/{challengeId}/placetimeoffers")
public class PlaceTimeOfferResource {

    private final PlaceTimeOfferService placeTimerOfferService;
    private final DtoMappingService mappingService;

    @PostMapping
    public ResponseEntity<PlaceTimeOfferDto> addOffer(@PathVariable String challengeId,
                                                      @RequestBody @Valid PlaceTimeOfferDto form) throws ApiException {

        return placeTimerOfferService.saveOffer(challengeId, form)
                .map(mappingService::mapToDto)
                .map(offer -> ResponseEntity.created(createLocationByAddingIdToCurentRequest(offer.getId())).body(offer))
                .orElseThrow(InternalServerException::new);
    }

    @GetMapping
    public ResponseEntity<List<PlaceTimeOfferDto>> getOffers(@PathVariable String challengeId) throws Exception {

        List<PlaceTimeOfferDto> placeTimeOfferDtos = this.placeTimerOfferService.getOffers(challengeId).stream()
                .map(mappingService::mapToDto).collect(Collectors.toList());

        return ResponseEntity.ok(placeTimeOfferDtos);
    }

    @PostMapping("/{id}/acceptance")
    public ResponseEntity<PlaceTimeOfferDto> accept(@PathVariable String challengeId,
                                                    @PathVariable String id) throws ApiException {

        PlaceTimeOffer acceptedOffer = placeTimerOfferService.accept(challengeId, id);
        return ResponseEntity.ok(mappingService.mapToDto(acceptedOffer));
    }

    @PostMapping("/{id}/rejection")
    public ResponseEntity<PlaceTimeOfferDto> reject(@PathVariable String challengeId,
                                                    @PathVariable String id) throws ApiException {

        PlaceTimeOffer rejectedOffer = placeTimerOfferService.reject(challengeId, id);
        return ResponseEntity.ok(mappingService.mapToDto(rejectedOffer));
    }

    @PostMapping("/{id}/cancelation")
    public ResponseEntity<PlaceTimeOfferDto> cancel(@PathVariable String challengeId,
                                                    @PathVariable String id) throws ApiException {

        PlaceTimeOffer cancelledOffer = placeTimerOfferService.cancel(challengeId, id);
        return ResponseEntity.ok(mappingService.mapToDto(cancelledOffer));
    }

    public PlaceTimeOfferResource(PlaceTimeOfferService placeTimerOfferService, DtoMappingService mappingService) {
        this.placeTimerOfferService = placeTimerOfferService;
        this.mappingService = mappingService;
    }

}
