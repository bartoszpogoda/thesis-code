package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.RegionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamCreationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;

@Service
public class TeamService {

    private TeamRepository teamRepository;
    private PlayerService playerService;
    private DisciplineService disciplineService;
    private RegionService regionService;


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

    public Optional<Team> getCurrentPlayerTeam(String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerService.getCurrentPlayer(disciplineId).map(Player::getTeam);
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

    public TeamService(TeamRepository teamRepository, PlayerService playerService, DisciplineService disciplineService, RegionService regionService) {
        this.teamRepository = teamRepository;
        this.playerService = playerService;
        this.disciplineService = disciplineService;
        this.regionService = regionService;
    }

}
