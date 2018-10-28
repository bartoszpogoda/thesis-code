package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerAlreadyInTeamException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownDisciplineException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.joda.time.LocalDate;
import org.joda.time.Years;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private PlayerRepository playerRepository;

    private DisciplineService disciplineService;

    private UserService userService;

    public Optional<Player> registerCurrentUser(@Valid PlayerRegistrationForm registrationForm) throws UnknownDisciplineException, PlayerAlreadyInTeamException {
//        disciplineService.checkDisciplineExists(disciplineId);

        Optional<User> currentUserOpt = userService.getCurrentUser();
        if (currentUserOpt.isPresent()) {
            User currentUser = currentUserOpt.get();

            Optional<Player> existingUser = playerRepository.findByUserAndDisciplineId(currentUser, registrationForm.getDisciplineId());
            if (existingUser.isPresent()) {
                throw new PlayerAlreadyInTeamException();
            }

            Player player = new Player();
            player.setUser(currentUser);
            player.setDisciplineId(registrationForm.getDisciplineId());
            player.setRegionId(registrationForm.getRegionId());
            player.setHeight(registrationForm.getHeight());
            player.setYearsOfExperience(registrationForm.getYearsOfExperience());

            return Optional.ofNullable(playerRepository.save(player));
        }
        return Optional.empty();
    }

    public Optional<Player> getCurrentPlayer(String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return userService.getCurrentUser()
                .flatMap(user -> playerRepository.findByUserAndDisciplineId(user, disciplineId));
    }

    public int calculateAge(LocalDate birthDate) {
        LocalDate now = new LocalDate();

        return Years.yearsBetween(birthDate, now).getYears();
    }


    public Optional<Player> getById(String id) {
        return playerRepository.findById(id);
    }

    public Optional<Player> getByUserId(String userId, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findByUserIdAndDisciplineId(userId, disciplineId);
    }

    public Page<Player> query(Pageable pageable, Optional<String> nameFragment, boolean withoutTeam, Optional<String> disciplineId, Optional<String> regionId) {

        return playerRepository.findAll(playerQuery(nameFragment, withoutTeam, disciplineId, regionId), pageable);

    }

    private Specification<Player> playerQuery(Optional<String> nameFragment, boolean withoutTeam, Optional<String> disciplineId, Optional<String> regionId) {
        return (Specification<Player>) (root, query, builder) -> {

            List<Optional<Predicate>> potentialPredicates = new ArrayList<>();

            potentialPredicates.add(nameFragment.map(fragment -> builder.like(
                    builder.lower(root.<User>get("user").get("fullName")), "%" + fragment.toLowerCase() + "%")));
            potentialPredicates.add(withoutTeam ? Optional.of(builder.isNull(root.get("team"))) : Optional.empty());
            potentialPredicates.add(disciplineId.map(disc -> builder.equal(root.get("disciplineId"), disc)));
            potentialPredicates.add(regionId.map(reg -> builder.equal(root.get("regionId"), reg)));

            List<Predicate> effectivePredicates = potentialPredicates.stream()
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());

            return builder.and(effectivePredicates.toArray(new Predicate[effectivePredicates.size()]));
        };
    }

    public PlayerService(PlayerRepository playerRepository, DisciplineService disciplineService, UserService userService) {
        this.playerRepository = playerRepository;
        this.disciplineService = disciplineService;
        this.userService = userService;
    }
}
