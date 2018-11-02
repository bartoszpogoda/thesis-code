package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer;

public enum PlaceTimeOfferStatus {
    Pending(0),
    Accepted(1),
    Rejected(2),
    Cancelled(3);

    private final int value;

    PlaceTimeOfferStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
