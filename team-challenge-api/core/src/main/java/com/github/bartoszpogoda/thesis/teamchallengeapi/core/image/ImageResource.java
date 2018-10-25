package com.github.bartoszpogoda.thesis.teamchallengeapi.core.image;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.exception.impl.ImageNotFoundException;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.image.dto.ImagePathDto;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("images")
public class ImageResource {
    private final ImageService imageService;

    @PostMapping("users")
    public ResponseEntity<ImagePathDto> uploadUserAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        String id = imageService.saveUserAvatar(file);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ImagePathDto(id));
    }

    @GetMapping(value = "users/{id}")
    @ResponseBody
    public ResponseEntity<Resource> getUserAvatar(@PathVariable String id) throws MalformedURLException, ImageNotFoundException {
        Resource file = imageService.getUserAvatar(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    public ImageResource(ImageService imageService) {
        this.imageService = imageService;
    }
}
