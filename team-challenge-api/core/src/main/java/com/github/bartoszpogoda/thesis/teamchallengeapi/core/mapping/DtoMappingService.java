package com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class DtoMappingService {

    private ModelMapper modelMapper;

    private PlayerService playerService;

    public PlayerDto mapToDto(Player player) {
        PlayerDto playerDto = modelMapper.map(player, PlayerDto.class);

        playerDto.setFullName(player.getUser().getFullName());
        playerDto.setAge(playerService.calculateAge(player.getUser().getBirthdayDate()));
        playerDto.setTeamName(player.getTeam() == null ? "" : player.getTeam().getName());

        return playerDto;
    }

    public TeamDto mapToDto(Team team) {
        TeamDto teamDto = modelMapper.map(team, TeamDto.class);

        teamDto.setManagerName(team.getManager().getUser().getFullName());

        return teamDto;
    }

    public DtoMappingService(ModelMapper modelMapper, PlayerService playerService) {
        this.modelMapper = modelMapper;
        this.playerService = playerService;
    }

}
