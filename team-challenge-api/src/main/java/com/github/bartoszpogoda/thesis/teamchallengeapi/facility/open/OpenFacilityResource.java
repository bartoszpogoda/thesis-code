package com.github.bartoszpogoda.thesis.teamchallengeapi.facility.open;

import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.impl.FacilityNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.facility.model.OpenFacilityRegistrationForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/{disciplineId}/facilities/open")
public class OpenFacilityResource {

    private final OpenFacilityService openFacilityService;

    @GetMapping
    public List<OpenFacility> getAll(@PathVariable("disciplineId") String disciplineId) {
        return openFacilityService.getAllForDiscipline(disciplineId);
    }

    @PostMapping
    public ResponseEntity<OpenFacility> register(@PathVariable("disciplineId") String disciplineId,
                                                 @Valid @RequestBody OpenFacilityRegistrationForm registrationForm) throws Exception {
        return openFacilityService.create(registrationForm, disciplineId)
                .map(openFacility ->
                        ResponseEntity.created(createLocationByAddingIdToCurentRequest(openFacility.getId())).body(openFacility))
                .orElseThrow(Exception::new);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpenFacility> get(@PathVariable("disciplineId") String discliplineId,
                                            @PathVariable("id") String id) throws FacilityNotFoundException {

        return openFacilityService.getByIdAndDiscipline(id, discliplineId)
                .map(ResponseEntity::ok)
                .orElseThrow(FacilityNotFoundException::new);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remove(@PathVariable("disciplineId") String discliplineId,
                                            @PathVariable("id") String id) throws FacilityNotFoundException {

        openFacilityService.removeByIdAndDiscipline(id, discliplineId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    public OpenFacilityResource(OpenFacilityService openFacilityService) {
        this.openFacilityService = openFacilityService;
    }



}
