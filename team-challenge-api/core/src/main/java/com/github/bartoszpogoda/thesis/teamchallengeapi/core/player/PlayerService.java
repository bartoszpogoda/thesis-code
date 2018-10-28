package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.ImageService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.joda.time.LocalDate;
import org.joda.time.Years;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Optional;

@Service
public class PlayerService {

    private PlayerRepository playerRepository;

    private DisciplineService disciplineService;

    private UserService userService;

    private ImageService imageService;

    public Optional<Player> registerCurrentUser(String disciplineId, @Valid PlayerRegistrationForm registrationForm) throws UnknownDisciplineException, PlayerAlreadyInTeamException {
        disciplineService.checkDisciplineExists(disciplineId);

        Optional<User> currentUserOpt = userService.getCurrentUser();
        if(currentUserOpt.isPresent()) {
            User currentUser = currentUserOpt.get();

            Optional<Player> existingUser = playerRepository.findByUserAndDisciplineId(currentUser, disciplineId);
            if(existingUser.isPresent()) {
                throw new PlayerAlreadyInTeamException();
            }

            Player player = new Player();
            player.setUser(currentUser);
            player.setDisciplineId(disciplineId);
            player.setHeight(registrationForm.getHeight());
            player.setYearsOfExperience(registrationForm.getYearsOfExperience());

            return Optional.ofNullable(playerRepository.save(player));
        }
        return Optional.empty();
    }

    public Optional<Player> get(String playerId, String disciplineId) {
        return playerRepository.findByIdAndDisciplineId(playerId, disciplineId);
    }

    public boolean playerExists(String playerId, String disciplineId) {
        return playerRepository.existsPlayerByIdAndDisciplineId(playerId, disciplineId);
    }

    public Optional<Player> getCurrentPlayer(String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return userService.getCurrentUser()
                .flatMap(user -> playerRepository.findByUserAndDisciplineId(user, disciplineId));
    }

    public Page<Player> findAllPlayers(Pageable pageable, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);


        return playerRepository.findAllByDisciplineId(pageable, disciplineId);
    }

    public Page<Player> findByName(Pageable pageable, String disciplineId, String fullNamePortion) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findByDisciplineIdAndUserFullNameContainingIgnoreCase(pageable, disciplineId, fullNamePortion);

    }

    public Page<Player> findAllPlayersWithoutTeam(Pageable pageable, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findWithoutTeam(pageable, disciplineId);
    }

    public Page<Player> findWithoutTeamByName(Pageable pageable, String disciplineId, String fullNamePortion) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findWithoutTeamByName(pageable, disciplineId, fullNamePortion);

    }

    public int calculateAge(LocalDate birthDate) {
        LocalDate now = new LocalDate();

        return Years.yearsBetween(birthDate, now).getYears();
    }

    public PlayerService(PlayerRepository playerRepository, DisciplineService disciplineService, UserService userService, ImageService imageService) {
        this.playerRepository = playerRepository;
        this.disciplineService = disciplineService;
        this.userService = userService;
        this.imageService = imageService;
    }

    public Optional<Player> getByIdAndDiscipline(String id, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findByIdAndDisciplineId(id, disciplineId);
    }

    public Optional<Player> getByUserId(String userId, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerRepository.findByUserIdAndDisciplineId(userId, disciplineId);
    }

    public Resource getAvatar(String disciplineId, String id) throws UnknownDisciplineException, PlayerNotFoundException, MalformedURLException, ImageNotFoundException {
        disciplineService.checkDisciplineExists(disciplineId);

        Player player = getByIdAndDiscipline(id, disciplineId).orElseThrow(PlayerNotFoundException::new);

        return this.imageService.getUserAvatar(player.getUser().getImagePath());
    }

    @Transactional
    public void saveAvatar(String disciplineId, String playerId, MultipartFile file) throws UnknownDisciplineException, IOException, PlayerNotFoundException, AccessForbiddenException {
        disciplineService.checkDisciplineExists(disciplineId);

        Player currentPlayer = getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (!currentPlayer.getId().equals(playerId)) {
            throw new AccessForbiddenException();
        }

        String imagePath = this.imageService.saveUserAvatar(file);
        currentPlayer.getUser().setImagePath(imagePath);
    }
}
