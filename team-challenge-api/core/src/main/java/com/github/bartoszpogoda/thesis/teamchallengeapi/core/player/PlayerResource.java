package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.discipline.DisciplineService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping.DtoMappingService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerRegistrationForm;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.CustomPage;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.PaginationUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;

import static com.github.bartoszpogoda.thesis.teamchallengeapi.core.util.ResponseUtil.createLocationByAddingIdToCurentRequest;

@RestController
@RequestMapping("/{disciplineId}/players")
public class PlayerResource {

    private PlayerService playerService;

    private DtoMappingService mappingService;

    @PostMapping
    public ResponseEntity<PlayerDto> register(@PathVariable("disciplineId") String disciplineId,
                                              @Valid @RequestBody PlayerRegistrationForm registrationForm) throws PlayerAlreadyInTeamException, UnknownDisciplineException, InternalServerException {
        return playerService.registerCurrentUser(disciplineId, registrationForm)
                .map(mappingService::mapToDto)
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
                                                            Pageable pageable, @RequestParam(name = "name", required = false) String nameFragment,
                                                            @RequestParam(name = "withoutTeam", required = false) boolean withoutTeam) throws UnknownDisciplineException {

        Page<Player> players;
        if (nameFragment != null) {
            if (withoutTeam) {
                players = playerService.findWithoutTeamByName(pageable, disciplineId, nameFragment);
            } else {
                players = playerService.findByName(pageable, disciplineId, nameFragment);
            }
        } else {
            if (withoutTeam) {
                players = playerService.findAllPlayersWithoutTeam(pageable, disciplineId);
            } else {
                players = playerService.findAllPlayers(pageable, disciplineId);
            }
        }

        Page<PlayerDto> playersDto = players.map(mappingService::mapToDto);

        return ResponseEntity.ok(PaginationUtil.toCustomPage(playersDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayer(@PathVariable("disciplineId") String disciplineId, @PathVariable("id") String id) throws UnknownDisciplineException, PlayerNotFoundException {

        return playerService.getByIdAndDiscipline(id, disciplineId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(PlayerNotFoundException::new);
    }

    @GetMapping("/current")
    public ResponseEntity<PlayerDto> getCurrentPlayer(@PathVariable String disciplineId) throws UnknownDisciplineException, PlayerNotFoundException {
        return playerService.getCurrentPlayer(disciplineId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(PlayerNotFoundException::new);
    }

    @GetMapping(params = "userId")
    public ResponseEntity<PlayerDto> getPlayerByUserId(@PathVariable String disciplineId, @RequestParam String userId) throws UnknownDisciplineException, PlayerNotFoundException {

        return playerService.getByUserId(userId, disciplineId)
                .map(mappingService::mapToDto)
                .map(ResponseEntity::ok)
                .orElseThrow(PlayerNotFoundException::new);
    }

    @PostMapping("/{id}/avatar")
    public ResponseEntity<?> uploadAvatar(@PathVariable String disciplineId,
                                              @PathVariable String id,
                                              @RequestParam("file") MultipartFile file) throws IOException, UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException, AccessForbiddenException, TeamNotFoundException {
        this.playerService.saveAvatar(disciplineId, id, file);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}/avatar")
    @ResponseBody
    public ResponseEntity<Resource> getAvatar(@PathVariable String disciplineId,
                                                  @PathVariable String id) throws MalformedURLException, ImageNotFoundException, TeamNotFoundException, UnknownDisciplineException, UnknownRegionException, PlayerNotFoundException {
        Resource file = this.playerService.getAvatar(disciplineId , id);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .cacheControl(CacheControl.maxAge(600, TimeUnit.SECONDS))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    public PlayerResource(UserService userService, PlayerService playerService, DisciplineService disciplineService, DtoMappingService mappingService) {
        this.playerService = playerService;
        this.mappingService = mappingService;
    }
}
