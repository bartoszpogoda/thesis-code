package com.github.bartoszpogoda.thesis.teamchallengeapi.core.player;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends CrudRepository<Player, String> {

    boolean existsPlayerByIdAndDisciplineId(String id, String disciplineId);

    Optional<Player> findByUserAndDisciplineId(User user, String disciplineId);

    Optional<Player> findByIdAndDisciplineId(String playerId, String disciplineId);

    Optional<Player> findByUserIdAndDisciplineId(String userId, String disciplineId);

    Page<Player> findAllByDisciplineId(Pageable pageable, String disciplineId);

    @Query("SELECT p FROM Player p where (p.team IS NULL AND p.disciplineId = :disciplineId)")
    Page<Player> findWithoutTeam(Pageable pageable, @Param("disciplineId") String disciplineId);

    @Query("SELECT p FROM Player p where (p.team IS NULL AND p.disciplineId = :disciplineId AND UPPER(p.user.fullName) LIKE '%' || UPPER(:fullNamePortion) || '%')")
    Page<Player> findWithoutTeamByName(Pageable pageable, @Param("disciplineId") String disciplineId, @Param("fullNamePortion") String fullNamePortion);

    Page<Player> findByDisciplineIdAndUserFullNameContainingIgnoreCase(Pageable pageable, String disciplineId, String fullName);

}
