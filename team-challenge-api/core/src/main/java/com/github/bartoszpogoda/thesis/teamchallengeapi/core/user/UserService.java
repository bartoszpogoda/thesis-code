package com.github.bartoszpogoda.thesis.teamchallengeapi.core.user;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.EmailAlreadyUsedException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.model.RegisterForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;

    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return Optional.ofNullable(authentication)
                .map(Authentication::getPrincipal)
                .filter(org.springframework.security.core.userdetails.User.class::isInstance)
                .map(org.springframework.security.core.userdetails.User.class::cast)
                .map(org.springframework.security.core.userdetails.User::getUsername)
                .flatMap(userRepository::findUserByEmail);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public Optional<User> createUser(RegisterForm registerForm) throws EmailAlreadyUsedException {

        if(userRepository.findUserByEmail(registerForm.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        }

        User user = new User();
        user.setEmail(registerForm.getEmail());
        user.setEncodedPassword(encoder.encode(registerForm.getPassword()));
        user.setFullName(registerForm.getFullName());

        User savedUser = userRepository.save(user);
        return Optional.ofNullable(savedUser);
    }

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
}
