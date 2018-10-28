package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends CrudRepository<Player, String>, JpaSpecificationExecutor<Player> {

    Optional<Player> findById(String id);

    Optional<Player> findByUserAndDisciplineId(User user, String disciplineId);

    Optional<Player> findByUserIdAndDisciplineId(String userId, String disciplineId);

}
