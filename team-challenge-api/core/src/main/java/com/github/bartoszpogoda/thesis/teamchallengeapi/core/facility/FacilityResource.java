package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.FacilityNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model.FacilityDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model.FacilityRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/facilities")
public class FacilityResource {

    private final FacilityService facilityService;

    private final DtoMappingService mappingService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page.")
    })
    @GetMapping
    public ResponseEntity<CustomPage<FacilityDto>> query(Pageable pageable,
                                                         @RequestParam(required = false) String disciplineId,
                                                         @RequestParam(required = false) String regionId) {

        Page<FacilityDto> facilityDtos = facilityService.query(pageable, Optional.ofNullable(disciplineId),
                Optional.ofNullable(regionId)).map(mappingService::mapToDto);
        return ResponseEntity.ok(PaginationUtil.toCustomPage(facilityDtos));
    }

    @PostMapping
    public ResponseEntity<FacilityDto> register(@Valid @RequestBody FacilityRegistrationForm registrationForm) throws Exception {
        return facilityService.create(registrationForm)
                .map(facility -> this.mappingService.mapToDto(facility))
                .map(facilityDto ->
                        ResponseEntity.created(createLocationByAddingIdToCurentRequest(facilityDto.getId())).body(facilityDto))
                .orElseThrow(Exception::new);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacilityDto> get(@PathVariable("id") String id) throws FacilityNotFoundException {

        return facilityService.getById(id)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(FacilityNotFoundException::new);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remove(@PathVariable("id") String id) throws FacilityNotFoundException {

        facilityService.removeById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    public FacilityResource(FacilityService facilityService, DtoMappingService mappingService) {
        this.facilityService = facilityService;
        this.mappingService = mappingService;
    }



}
