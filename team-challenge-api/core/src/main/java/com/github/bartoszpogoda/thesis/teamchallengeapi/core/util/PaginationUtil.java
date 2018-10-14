package com.github.bartoszpogoda.thesis.teamchallengeapi.core.util;

import org.springframework.data.domain.Page;

public class PaginationUtil {

    public static <T> CustomPage<T> toCustomPage(Page<T> page) {
        CustomPage<T> customPage = new CustomPage<>();
        customPage.setContent(page.getContent());
        customPage.setNumber(page.getNumber());
        customPage.setSize(page.getSize());
        customPage.setTotalElements(page.getTotalElements());
        customPage.setTotalPages(page.getTotalPages());

        return customPage;
    }

}
