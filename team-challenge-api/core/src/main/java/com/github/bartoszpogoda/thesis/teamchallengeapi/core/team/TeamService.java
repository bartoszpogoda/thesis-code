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
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private TeamRepository teamRepository;
    private PlayerService playerService;
    private DisciplineService disciplineService;
    private RegionService regionService;
    private PositionService positionService;
    private ImageService imageService;

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

    public Optional<Team> getByIdAndDiscipline(String id, String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return teamRepository.findByIdAndDisciplineId(id, disciplineId);
    }

    public List<Player> getTeamMembers(String disciplineId, String regionId, String id) throws UnknownDisciplineException, UnknownRegionException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId)
                .map(team -> team.getPlayers())
                .orElse(Collections.emptyList());
    }


    public Position getHome(String disciplineId, String regionId, String id) throws UnknownDisciplineException, UnknownRegionException, PositionNotFoundException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        return teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId)
                .map(team -> team.getHome())
                .orElseThrow(PositionNotFoundException::new);
    }

    public Optional<Team> getCurrentPlayerTeam(String disciplineId) throws UnknownDisciplineException {
        disciplineService.checkDisciplineExists(disciplineId);

        return playerService.getCurrentPlayer(disciplineId).map(Player::getTeam);
    }

    @Transactional
    public Position setHome(String disciplineId, String regionId, String id, PositionDto positionDto) throws UnknownDisciplineException, UnknownRegionException, TeamNotFoundException, PlayerNotFoundException, AccessForbiddenException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        Team team = teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId).orElseThrow(TeamNotFoundException::new);
        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (!team.getManager().equals(currentPlayer)) {
            throw new AccessForbiddenException();
        }

        Position position = this.positionService.save(positionDto);
        team.setHome(position);

        return position;
    }


    @Transactional
    public void saveTeamAvatar(String disciplineId, String regionId, String id, MultipartFile file) throws UnknownDisciplineException, UnknownRegionException, TeamNotFoundException, PlayerNotFoundException, AccessForbiddenException, IOException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        Team team = teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId).orElseThrow(TeamNotFoundException::new);
        Player currentPlayer = playerService.getCurrentPlayer(disciplineId).orElseThrow(PlayerNotFoundException::new);

        if (!team.getManager().equals(currentPlayer)) {
            throw new AccessForbiddenException();
        }

        team.setImagePath(this.imageService.saveTeamAvatar(id, file));
    }

    public TeamService(TeamRepository teamRepository, PlayerService playerService, DisciplineService disciplineService, RegionService regionService, PositionService positionService, ImageService imageService) {
        this.teamRepository = teamRepository;
        this.playerService = playerService;
        this.disciplineService = disciplineService;
        this.regionService = regionService;
        this.positionService = positionService;
        this.imageService = imageService;
    }

    public Resource getTeamAvatar(String disciplineId, String regionId, String id) throws UnknownDisciplineException, UnknownRegionException, TeamNotFoundException, MalformedURLException, ImageNotFoundException {
        disciplineService.checkDisciplineExists(disciplineId);
        regionService.checkRegionExists(regionId);

        Team team = teamRepository.findByIdAndDisciplineIdAndRegionId(id, disciplineId, regionId).orElseThrow(TeamNotFoundException::new);

        return imageService.getTeamAvatar(team.getImagePath());
    }
}
