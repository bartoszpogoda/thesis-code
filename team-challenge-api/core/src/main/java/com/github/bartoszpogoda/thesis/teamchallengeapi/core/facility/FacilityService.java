package com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.AccessForbiddenException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.FacilityNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownDisciplineException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownRegionException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model.FacilityRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.PositionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.RegionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;
    private final DisciplineService disciplineService;
    private final RegionService regionService;
    private final PositionService positionService;
    private final UserService userService;

    public Optional<Facility> getById(String id) {
        return facilityRepository.findById(id);
    }

    @Transactional
    public Optional<Facility> create(FacilityRegistrationForm form)
            throws UnknownDisciplineException, UnknownRegionException, AccessForbiddenException {
        disciplineService.checkDisciplineExists(form.getDisciplineId());
        regionService.checkRegionExists(form.getRegionId());

        User currentUser = this.userService.getCurrentUser().orElseThrow(AccessForbiddenException::new);

        Facility facility = Facility.builder()
                .disciplineId(form.getDisciplineId())
                .regionId(form.getRegionId())
                .name(form.getName())
                .address(form.getAddress())
                .position(this.positionService.save(form.getPosition()))
                .lighting(form.isLighting())
                .playingSpots(form.getPlayingSpots())
                .surfaceType(form.getSurfaceType())
                .description(form.getDescription())
                .tokenPrice(50)
                .registeredBy(currentUser)
                .build();

        Facility savedFacility = facilityRepository.save(facility);
        return Optional.ofNullable(savedFacility);
    }

    public FacilityService(FacilityRepository facilityRepository, DisciplineService disciplineService, RegionService regionService, PositionService positionService, UserService userService) {
        this.facilityRepository = facilityRepository;
        this.disciplineService = disciplineService;
        this.regionService = regionService;
        this.positionService = positionService;
        this.userService = userService;
    }

    public Page<Facility> query(Pageable pageable, Optional<String> disciplineId, Optional<String> regionId) {
        return facilityRepository.findAll(facilityQuery(disciplineId, regionId), pageable);
    }

    private Specification<Facility> facilityQuery(Optional<String> disciplineId, Optional<String> regionId) {
        return (Specification<Facility>) (root, query, builder) -> {

            List<Optional<Predicate>> potentialPredicates = new ArrayList<>();

            potentialPredicates.add(disciplineId.map(disc -> builder.equal(root.get("disciplineId"), disc)));
            potentialPredicates.add(regionId.map(reg -> builder.equal(root.get("regionId"), reg)));

            List<Predicate> effectivePredicates = potentialPredicates.stream()
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());

            return builder.and(effectivePredicates.toArray(new Predicate[effectivePredicates.size()]));
        };
    }

    public void removeById(String id) throws FacilityNotFoundException {
        if(this.facilityRepository.removeById(id) == 0) {
            throw new FacilityNotFoundException();
        }
    }
}
