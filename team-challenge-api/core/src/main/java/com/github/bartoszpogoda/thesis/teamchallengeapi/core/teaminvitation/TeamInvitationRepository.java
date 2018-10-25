package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TeamInvitationRepository  extends CrudRepository<TeamInvitation, String> {


    List<TeamInvitation> findByTargetPlayerIdAndTargetTeamDisciplineId(String id, String disciplineId);

    List<TeamInvitation> findByTargetTeamIdAndTargetTeamDisciplineId(String id, String disciplineId);

    Optional<TeamInvitation> findByIdAndTargetTeamDisciplineId(String id, String disciplineId);

    boolean existsByTargetTeamIdAndTargetTeamDisciplineIdAndTargetPlayerId(String targetTeamId, String disciplineId, String playerId);

    @Transactional
    void deleteByTargetPlayerIdAndTargetTeamDisciplineId(String id, String disciplineId);

}
