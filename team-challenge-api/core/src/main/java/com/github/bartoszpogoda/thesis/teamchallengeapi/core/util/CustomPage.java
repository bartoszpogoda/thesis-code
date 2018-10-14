package com.github.bartoszpogoda.thesis.teamchallengeapi.core.util;

import lombok.Data;

import java.util.List;

@Data
public class CustomPage<T> {

    private List<T> content;

    private int size;
    private long totalElements;
    private int totalPages;
    private int number;

}
