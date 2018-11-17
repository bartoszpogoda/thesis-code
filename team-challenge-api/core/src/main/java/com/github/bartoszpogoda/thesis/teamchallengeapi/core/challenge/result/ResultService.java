package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.ChallengeStatus;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.model.ResultDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.ApiException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.*;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import io.netty.util.internal.StringUtil;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ResultService {

    private final ChallengeService challengeService;
    private final PlayerService playerService;
    private final ResultRepository resultRepository;

    @Transactional
    public Optional<Result> get(String challengeId) throws ApiException {

        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        return Optional.ofNullable(challenge.getResult());
    }

    @Transactional
    public Optional<Result> saveResult(String challengeId, ResultDto form) throws ApiException {

        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(challenge.getStatus() != ChallengeStatus.Accepted) {
            throw new InvalidOperationException("Can't save result for challenge not in progress");
        }

        if(!form.getWinnerPoints().equals(form.getLoserPoints()) && StringUtil.isNullOrEmpty(form.getWinnerTeamId())) {
            throw new InvalidOperationException("Winner team id can not be empty when result is not a draw.");
        }

        return this.saveResult(currentTeam, challenge, form);
    }

    public Optional<Result> saveResult(Team currentTeam, Challenge challenge, ResultDto form) throws ApiException {

        Team winnerTeam = getWinner(challenge, form.getWinnerTeamId()).orElseThrow(TeamNotInChallengeException::new);

        Result result = Result.builder()
                .challenge(challenge)
                .status(ResultStatus.Reported)
                .loserPoints(form.getLoserPoints())
                .winnerPoints(form.getWinnerPoints())
                .reportedDate(new DateTime())
                .reportingTeam(currentTeam)
                .winnerTeam(winnerTeam).build();

        return Optional.ofNullable(this.resultRepository.save(result));
    }

    private Optional<Team> getWinner(Challenge challenge, String winnerTeamId) {
        Team winnerTeam = null;
        Team challengingTeam = challenge.getChallengingTeam();
        Team challengedTeam = challenge.getChallengedTeam();

        if(challengedTeam.getId().equals(winnerTeamId)) {
            winnerTeam = challengedTeam;
        } else if(challengingTeam.getId().equals(winnerTeamId)) {
            winnerTeam =challengingTeam;
        }

        return Optional.ofNullable(winnerTeam);
    }

    @Transactional
    public Result confirm(String challengeId) throws ApiException {
        return setStatus(challengeId, ResultStatus.Accepted);
    }

    @Transactional
    public Result reject(String challengeId) throws ApiException {
        return setStatus(challengeId, ResultStatus.Rejected);
    }

    private Result setStatus(String challengeId, ResultStatus status) throws ApiException {
        Challenge challenge = this.challengeService.getById(challengeId).orElseThrow(ChallengeNotFoundException::new);
        Result result = Optional.ofNullable(challenge.getResult()).orElseThrow(ResultNotFoundException::new);

        Player currentPlayer = this.playerService.getCurrentPlayer(challenge.getDisciplineId()).orElseThrow(PlayerNotFoundException::new);
        Team currentTeam = currentPlayer.getTeam();

        if(result.getReportingTeam().equals(currentTeam)) {
            throw new InvalidOperationException("You can not confirm / reject results reported by your team.");
        }

        if(result.getStatus() != ResultStatus.Reported) {
            throw new InvalidOperationException("ResultDto already confirmed or rejected.");
        }

        result.setStatus(status);
        challenge.setStatus(ChallengeStatus.Finished);

        return result;
    }

    public ResultService(ChallengeService challengeService, PlayerService playerService, ResultRepository resultRepository) {
        this.challengeService = challengeService;
        this.playerService = playerService;
        this.resultRepository = resultRepository;
    }
}
