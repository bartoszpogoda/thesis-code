package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result;

public enum ResultStatus {
    Reported(0),
    Accepted(1),
    Rejected(2);

    private final int value;

    ResultStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
