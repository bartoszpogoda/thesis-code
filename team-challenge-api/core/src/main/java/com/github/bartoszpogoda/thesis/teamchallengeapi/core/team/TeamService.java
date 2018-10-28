package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.ImageService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.PositionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.RegionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamCreationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
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
public class TeamService {

    private TeamRepository teamRepository;
    private PlayerService playerService;
    private DisciplineService disciplineService;
    private RegionService regionService;
    private PositionService positionService;
    private ImageService imageService;
    private UserService userService;

    public Optional<Team> findById(String id) {
        return teamRepository.findById(id);
    }

    @Transactional
    public Optional<Team> createTeamForCurrentPlayer(@Valid TeamCreationForm teamCreationForm)
            throws UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException, PlayerAlreadyInTeamException {

        disciplineService.checkDisciplineExists(teamCreationForm.getDisciplineId());
        regionService.checkRegionExists(teamCreationForm.getRegionId());

        Optional<Player> currentPlayerOpt = playerService.getCurrentPlayer(teamCreationForm.getDisciplineId());
        if(!currentPlayerOpt.isPresent()) {
            throw new PlayerNotFoundException();
        }

        Player currentPlayer = currentPlayerOpt.get();
        Team playerTeam = currentPlayer.getTeam();

        if(playerTeam != null) {
            throw new PlayerAlreadyInTeamException();
        }

        Team newTeam = createNewTeam(teamCreationForm.getDisciplineId(), teamCreationForm.getRegionId(), teamCreationForm.getName(), currentPlayer);
        currentPlayer.setTeam(newTeam);

        return Optional.of(teamRepository.save(newTeam));
    }

    private Team createNewTeam(String disciplineId, String regionId, String name, Player manager) {
        Team newTeam = new Team.TeamBuilder()
                .balance(0).active(false)
                .disciplineId(disciplineId).regionId(regionId)
                .name(name).manager(manager).build();

        return newTeam;
    }

    public List<Player> getTeamMembers(String id) throws TeamNotFoundException {
        return teamRepository.findById(id)
                .map(team -> team.getPlayers())
                .orElseThrow(TeamNotFoundException::new);
    }

    public Page<Team> query(Pageable pageable, Optional<String> name, Optional<String> disciplineId, Optional<String> regionId) {
        return teamRepository.findAll(teamQuery(name, disciplineId, regionId), pageable);

    }

    private Specification<Team> teamQuery(Optional<String> nameFragment, Optional<String> disciplineId, Optional<String> regionId) {
        return (Specification<Team>) (root, query, builder) -> {

            List<Optional<Predicate>> potentialPredicates = new ArrayList<>();

            potentialPredicates.add(nameFragment.map(fragment -> builder.like(
                    builder.lower(root.get("name")), "%" + fragment.toLowerCase() + "%")));
            potentialPredicates.add(disciplineId.map(disc -> builder.equal(root.get("disciplineId"), disc)));
            potentialPredicates.add(regionId.map(reg -> builder.equal(root.get("regionId"), reg)));

            List<Predicate> effectivePredicates = potentialPredicates.stream()
                    .filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());

            return builder.and(effectivePredicates.toArray(new Predicate[effectivePredicates.size()]));
        };
    }


    public Position getHome(String id) throws PositionNotFoundException {
       return teamRepository.findById(id)
                .map(team -> team.getHome())
                .orElseThrow(PositionNotFoundException::new);
    }

    @Transactional
    public Position setHome(String id, PositionDto positionDto) throws TeamNotFoundException, AccessForbiddenException {
        Team team = teamRepository.findById(id).orElseThrow(TeamNotFoundException::new);
        if(!isManagedByCurrentUser(team)) {
            throw new AccessForbiddenException();
        }

        Position position = this.positionService.save(positionDto);
        team.setHome(position);

        return position;
    }


    @Transactional
    public void saveTeamAvatar(String id, MultipartFile file) throws TeamNotFoundException, AccessForbiddenException, IOException {

        Team team = teamRepository.findById(id).orElseThrow(TeamNotFoundException::new);
        if(!isManagedByCurrentUser(team)) {
            throw new AccessForbiddenException();
        }

        team.setImagePath(this.imageService.saveTeamAvatar(id, file));
    }

    public Resource getTeamAvatar(String id) throws TeamNotFoundException, MalformedURLException, ImageNotFoundException {
        Team team = teamRepository.findById(id).orElseThrow(TeamNotFoundException::new);

        return imageService.getTeamAvatar(team.getImagePath());
    }

    public boolean isManagedByCurrentUser(Team team) throws AccessForbiddenException {
        User currentUser = userService.getCurrentUser().orElseThrow(AccessForbiddenException::new);

        return team.getManager().getUser().equals(currentUser);
    }

    public TeamService(TeamRepository teamRepository, PlayerService playerService, DisciplineService disciplineService, RegionService regionService, PositionService positionService, ImageService imageService, UserService userService) {
        this.teamRepository = teamRepository;
        this.playerService = playerService;
        this.disciplineService = disciplineService;
        this.regionService = regionService;
        this.positionService = positionService;
        this.imageService = imageService;
        this.userService = userService;
    }

}
