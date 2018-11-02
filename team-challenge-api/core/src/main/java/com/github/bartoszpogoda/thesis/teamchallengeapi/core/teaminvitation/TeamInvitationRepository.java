package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamInvitationRepository  extends CrudRepository<TeamInvitation, String>, JpaSpecificationExecutor<TeamInvitation> {

    Optional<TeamInvitation> findById(String id);

    List<TeamInvitation> findByTargetPlayerIdAndTargetTeamDisciplineId(String id, String disciplineId);

    List<TeamInvitation> findByTargetTeamIdAndTargetTeamDisciplineId(String id, String disciplineId);

    boolean existsByTargetTeamIdAndTargetPlayerId(String targetTeamId, String playerId);

    @Transactional
    void deleteByTargetPlayerIdAndTargetTeamDisciplineId(String id, String disciplineId);

}
