package com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge;


public enum ChallengeStatus {
    Pending(0),
    Accepted(1),
    Rejected(2),
    Canceled(3),
    Finished(4);

    private final int value;

    ChallengeStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
