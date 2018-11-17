package com.github.bartoszpogoda.thesis.teamchallengeapi.core.position;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PositionServiceTest {

    private PositionService positionService;

    @Before
    public void setUp() {
        positionService = new PositionService(null);
    }

    @Test
    public void shouldCalculateDistanceWhenClosePoints() {
        // given
        Position position1 = new Position(null, 51.108218, 17.065157); // budynek W10
        Position position2 = new Position(null, 51.108961, 17.0591722); // budynek C-1 (W4)

        // when
        double distance = positionService.distance(position1, position2);

        // then
        assertEquals(0.425, distance, 0.001);
    }

    @Test
    public void shouldCalculateDistanceWhenDistantPoints() {
        // given
        Position position1 = new Position(null, 50.436043, 16.650231); // Kłodzko
        Position position2 = new Position(null, 51.110736, 17.033733); // Wrocław

        // when
        double distance = positionService.distance(position1, position2);

        // then
        assertEquals(79.721, distance, 0.001);
    }
}