package com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.TeamInvitation;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model.TeamInvitationDto;
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

    public TeamInvitationDto mapToDto(TeamInvitation teamInvitation) {
        TeamInvitationDto teamInvitationDto = modelMapper.map(teamInvitation, TeamInvitationDto.class);

        teamInvitationDto.setPlayerId(teamInvitation.getTargetPlayer().getId());
        teamInvitationDto.setTeamId(teamInvitation.getTargetTeam().getId());
        teamInvitationDto.setTeamName(teamInvitation.getTargetTeam().getName());
        teamInvitationDto.setTeamManagerName(teamInvitation.getTargetTeam().getManager().getUser().getFullName());
        teamInvitationDto.setPlayerName(teamInvitation.getTargetPlayer().getUser().getFullName());

        return teamInvitationDto;
    }

    public DtoMappingService(ModelMapper modelMapper, PlayerService playerService) {
        this.modelMapper = modelMapper;
        this.playerService = playerService;
    }

}
