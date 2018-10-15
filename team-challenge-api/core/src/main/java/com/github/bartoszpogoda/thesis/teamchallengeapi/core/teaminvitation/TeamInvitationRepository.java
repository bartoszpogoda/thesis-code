package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamInvitationRepository  extends CrudRepository<TeamInvitation, String> {


    List<TeamInvitation> findByTargetPlayerIdAndTargetTeamDisciplineId(String id, String disciplineId);


    List<TeamInvitation> findByTargetTeamIdAndTargetTeamDisciplineId(String id, String disciplineId);

}
