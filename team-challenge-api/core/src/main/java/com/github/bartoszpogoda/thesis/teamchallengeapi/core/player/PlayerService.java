package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.ImageService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.joda.time.LocalDate;
import org.joda.time.Years;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.Predicate;
import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private PlayerRepository playerRepository;

    private DisciplineService disciplineService;

    private UserService userService;

    private ImageService imageService;

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
            player.setSkill(registrationForm.getSkill());

            return Optional.ofNullable(playerRepository.save(player));
        }
        return Optional.empty();
    }

    public Optional<Player> getCurrentPlayer(String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return userService.getCurrentUser()
                .flatMap(user -> playerRepository.findByUserAndDisciplineId(user, disciplineId));
    }

    public int getAge(Player player) {
        return calculateAge(player.getUser().getBirthdayDate());
    }

    public int calculateAge(LocalDate birthDate) {
        LocalDate now = new LocalDate();

        return Years.yearsBetween(birthDate, now).getYears();
    }


    public Optional<Player> getById(String id) {
        return playerRepository.findById(id);
    }

    public Page<Player> query(Pageable pageable, Optional<String> nameFragment,
                              boolean withoutTeam, Optional<String> disciplineId, Optional<String> regionId) {

        return playerRepository.findAll(playerQuery(nameFragment, withoutTeam, disciplineId, regionId), pageable);
    }

    private Specification<Player> playerQuery(Optional<String> nameFragment, boolean withoutTeam,
                                              Optional<String> disciplineId, Optional<String> regionId) {
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


    public Optional<Player> getByUserId(String userId, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findByUserIdAndDisciplineId(userId, disciplineId);
    }

    public Resource getAvatar(String id) throws MalformedURLException, ImageNotFoundException, PlayerNotFoundException {
        Player player = getById(id).orElseThrow(PlayerNotFoundException::new);

        return this.imageService.getUserAvatar(player.getUser().getImagePath());
    }


    @Transactional
    public void saveAvatar(String playerId, MultipartFile file) throws UnknownDisciplineException, IOException, PlayerNotFoundException, AccessForbiddenException {

        User currentUser = userService.getCurrentUser().orElseThrow(AccessForbiddenException::new);
        Player player = getById(playerId).orElseThrow(PlayerNotFoundException::new);

        if (!player.getUser().equals(currentUser)) {
            throw new AccessForbiddenException();
        }

        String imagePath = this.imageService.saveUserAvatar(file);
        player.getUser().setImagePath(imagePath);
    }


    public PlayerService(PlayerRepository playerRepository, DisciplineService disciplineService, UserService userService, ImageService imageService) {
        this.playerRepository = playerRepository;
        this.disciplineService = disciplineService;
        this.userService = userService;
        this.imageService = imageService;
    }
}
