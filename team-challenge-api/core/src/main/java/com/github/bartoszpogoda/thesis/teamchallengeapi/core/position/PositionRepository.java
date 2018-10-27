package com.github.bartoszpogoda.thesis.teamchallengeapi.core.position;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends CrudRepository<Position, String> {
}
