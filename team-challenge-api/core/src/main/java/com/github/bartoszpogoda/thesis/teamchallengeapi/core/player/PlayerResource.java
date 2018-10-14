package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.InternalServerException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerAlreadyExistsException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.PlayerNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.UnknownDisciplineException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/{disciplineId}/players")
public class PlayerResource {

    private PlayerService playerService;

    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<PlayerDto> register(@PathVariable("disciplineId") String disciplineId,
                                           @Valid @RequestBody PlayerRegistrationForm registrationForm) throws PlayerAlreadyExistsException, UnknownDisciplineException, InternalServerException {
        return playerService.registerCurrentUser(disciplineId, registrationForm)
                .map(this::convertToDto)
                .map(playerDto ->
                        ResponseEntity.created(createLocationByAddingIdToCurentRequest(playerDto.getId())).body(playerDto))
                .orElseThrow(InternalServerException::new);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page.")
    })
    @GetMapping
    public ResponseEntity<CustomPage<PlayerDto>> getPlayers(@PathVariable("disciplineId") String disciplineId,
                                                          Pageable pageable, @RequestParam(name = "name", required = false) String nameFragment) throws UnknownDisciplineException {

        Page<Player> players;
        if(nameFragment != null) {
            players = playerService.findByName(pageable, disciplineId, nameFragment);
        } else {
            players = playerService.findAllPlayers(pageable, disciplineId);
        }

        Page<PlayerDto> playersDto = players.map(this::convertToDto);

        return ResponseEntity.ok(PaginationUtil.toCustomPage(playersDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayer(@PathVariable("disciplineId") String disciplineId, @PathVariable("id") String id) throws UnknownDisciplineException, PlayerNotFoundException {

        return playerService.getByIdAndDiscipline(id, disciplineId)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(PlayerNotFoundException::new);
    }

    private PlayerDto convertToDto(Player player) {
        PlayerDto playerDto = modelMapper.map(player, PlayerDto.class);

        playerDto.setFullName(player.getUser().getFullName());
        playerDto.setAge(playerService.calculateAge(player.getUser().getBirthdayDate()));

        return playerDto;
    }

    public PlayerResource(UserService userService, PlayerService playerService, DisciplineService disciplineService, ModelMapper modelMapper) {
        this.playerService = playerService;
        this.modelMapper = modelMapper;
    }
}
