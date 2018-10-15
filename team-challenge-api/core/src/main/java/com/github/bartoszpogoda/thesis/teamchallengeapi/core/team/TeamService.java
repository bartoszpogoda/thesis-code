package com.github.bartoszpogoda.thesis.teamchallengeapi.core.team;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerAlreadyInTeamException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownDisciplineException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownRegionException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.RegionService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamCreationForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private TeamRepository teamRepository;
    private PlayerService playerService;
    private DisciplineService disciplineService;
    private RegionService regionService;

    @Transactional
    public Optional<Team> createTeamForCurrentPlayer(String disciplineId, String regionId, @Valid TeamCreationForm teamCreationForm) throws UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException, PlayerAlreadyInTeamException {

        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        Optional<Player> currentPlayerOpt = playerService.getCurrentPlayer(disciplineId);
        if(!currentPlayerOpt.isPresent()) {
            throw new PlayerNotFoundException();
        }

        Player currentPlayer = currentPlayerOpt.get();
        Team playerTeam = currentPlayer.getTeam();

        if(playerTeam != null) {
            throw new PlayerAlreadyInTeamException();
        }

        Team newTeam = createNewTeam(disciplineId, regionId, teamCreationForm.getName(), currentPlayer);
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

    public TeamService(TeamRepository teamRepository, PlayerService playerService, DisciplineService disciplineService, RegionService regionService) {
        this.teamRepository = teamRepository;
        this.playerService = playerService;
        this.disciplineService = disciplineService;
        this.regionService = regionService;
    }

    public Page<Team> findByName(Pageable pageable, String disciplineId, String regionId, String nameFragment) throws UnknownDisciplineException, UnknownRegionException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findByDisciplineIdAndRegionIdAndNameContainingIgnoreCase(pageable, disciplineId, regionId, nameFragment);
    }

    public Page<Team> findAllTeams(Pageable pageable, String disciplineId, String regionId) throws UnknownRegionException, UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findAllByDisciplineIdAndRegionId(pageable, disciplineId, regionId);
    }

    public Optional<Team> getByIdAndDisciplineAndRegion(String id, String disciplineId, String regionId) throws UnknownRegionException, UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId);
    }

    public List<Player> getTeamMembers(String disciplineId, String regionId, String id) throws UnknownDisciplineException, UnknownRegionException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId)
                .map(team -> team.getPlayers())
                .orElse(Collections.emptyList());
    }
}
