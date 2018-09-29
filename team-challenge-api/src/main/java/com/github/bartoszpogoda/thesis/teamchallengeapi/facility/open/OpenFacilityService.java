package com.github.bartoszpogoda.thesis.teamchallengeapi.facility.open;

import com.github.bartoszpogoda.thesis.teamchallengeapi.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.impl.FacilityNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.exception.impl.UnknownDisciplineException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.facility.model.OpenFacilityRegistrationForm;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OpenFacilityService {

    private final OpenFacilityRepository openFacilityRepository;

    private final DisciplineService disciplineService;

    public List<OpenFacility> getAllForDiscipline(String disciplineId) {
        return openFacilityRepository.findAllByDisciplineIdEquals(disciplineId);
    }

    public Optional<OpenFacility> getById(String id) {
        return openFacilityRepository.findById(id);
    }

    public Optional<OpenFacility> getByIdAndDiscipline(String id, String discliplineId) {
//        return openFacilityRepository.findById(id)
//                .filter(openFacility -> openFacility.getDisciplineId().equals(discliplineId));

        return openFacilityRepository.findByDisciplineIdAndId(discliplineId, id);
    }

    public Optional<OpenFacility> create(OpenFacilityRegistrationForm registrationForm, String disciplineId)
            throws UnknownDisciplineException {

        if(!disciplineService.disciplineExists(disciplineId)) {
            throw new UnknownDisciplineException();
        }

        OpenFacility openFacility = new OpenFacility();
        openFacility.setDisciplineId(disciplineId);
        openFacility.setName(registrationForm.getName());
        openFacility.setTemp("Temp");

        OpenFacility savedFacility = openFacilityRepository.save(openFacility);
        return Optional.ofNullable(savedFacility);
    }

    public OpenFacilityService(OpenFacilityRepository openFacilityRepository, DisciplineService disciplineService) {
        this.openFacilityRepository = openFacilityRepository;
        this.disciplineService = disciplineService;
    }

    public void removeByIdAndDiscipline(String id, String discliplineId) throws FacilityNotFoundException {
        if(this.openFacilityRepository.removeByDisciplineIdAndId(discliplineId, id) == 0) {
            throw new FacilityNotFoundException();
        }
    }
}
