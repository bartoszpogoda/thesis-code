package com.github.bartoszpogoda.thesis.teamchallengeapi.core;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.ImageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DevCommandLineRunner implements CommandLineRunner {

    private final ImageService imageService;

    @Override
    public void run(String... args) throws Exception {
        imageService.clear();
        imageService.createDir();
    }

    public DevCommandLineRunner(ImageService imageService) {
        this.imageService = imageService;
    }

}