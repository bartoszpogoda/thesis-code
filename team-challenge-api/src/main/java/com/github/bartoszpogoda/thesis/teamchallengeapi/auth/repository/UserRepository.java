package com.github.bartoszpogoda.thesis.teamchallengeapi.auth.repository;

import com.github.bartoszpogoda.thesis.teamchallengeapi.auth.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    Optional<User> findUserByEmail(String email);

}
