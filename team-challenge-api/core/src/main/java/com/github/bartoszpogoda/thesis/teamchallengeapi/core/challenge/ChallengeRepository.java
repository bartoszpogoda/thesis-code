package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends CrudRepository<Challenge, String>, JpaSpecificationExecutor<Challenge> {

    List<Challenge> findAllByChallengingTeamAndChallengedTeam(Team challengingTeam, Team challengedTeam);

    List<Challenge> findAllByChallengingTeamAndStatus(Team challengingTeam, ChallengeStatus status);

    List<Challenge> findAllByChallengedTeamAndStatus(Team challengedTeam, ChallengeStatus status);
}
