package com.github.bartoszpogoda.thesis.teamchallengeapi.temp;

import lombok.Data;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(HelloWorldResource.HELLO_WORLD_RESOURCE_URL)
public class HelloWorldResource {
    static final String HELLO_WORLD_RESOURCE_URL = "/helloworld";

    @Data
    class HelloWorld {
        @NonNull
        public String message;
    }

    @GetMapping
    public ResponseEntity<HelloWorld> getHelloWorld() {

        return ResponseEntity.ok(new HelloWorld("Hello world!"));
    }
}
