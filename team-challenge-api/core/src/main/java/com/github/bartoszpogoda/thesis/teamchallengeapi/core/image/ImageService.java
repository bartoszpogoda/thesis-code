package com.github.bartoszpogoda.thesis.teamchallengeapi.core.image;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.ImageNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.User;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class ImageService {

    private final Path imagesRoot;

    private UserService userService;

    @Transactional
    public String saveUserAvatar(MultipartFile file) throws IOException {
        User currentUser = userService.getCurrentUser().orElseThrow(RuntimeException::new);

        Files.copy(file.getInputStream(), this.imagesRoot.resolve("users/" + currentUser.getId()), REPLACE_EXISTING);

        currentUser.setImagePath(currentUser.getId());

        return currentUser.getId();
    }

    public Resource getUserAvatar(String id) throws MalformedURLException, ImageNotFoundException {
        Path file = imagesRoot.resolve("users/" + id);
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new ImageNotFoundException();
        }
    }

    public void clear() {
        FileSystemUtils.deleteRecursively(imagesRoot.toFile());
    }

    public void createDir() throws IOException {
        Files.createDirectory(imagesRoot);
        Files.createDirectory(imagesRoot.resolve("users/"));
    }

    public ImageService(@Value("${teamchallengeapi.images.upload.dir}") String imagesRoot, UserService userService) {
        this.imagesRoot = Paths.get(imagesRoot);
        this.userService = userService;
    }

}