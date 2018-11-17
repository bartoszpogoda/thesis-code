package com.github.bartoszpogoda.thesis.teamchallengeapi.core.review;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface TeamReviewRepository extends CrudRepository<TeamReview, String> {

    Optional<TeamReview> findByChallengeAndReviewingTeam(Challenge challenge, Team reviewingTeam);

    List<TeamReview> findByReviewedTeam(Team reviewedTeam);

    Optional<TeamReview> findFirstByReviewingTeamAndReviewedTeamOrderByReviewDateDesc(Team reviewingTeam, Team reviewedTeam);
}
