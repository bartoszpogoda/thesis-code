package com.github.bartoszpogoda.thesis.teamchallengeapi.core.position;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import org.springframework.stereotype.Service;

@Service
public class PositionService {

    private static final double EATRTH_RADIUS_KM = 6371;

    private PositionRepository positionRepository;

    public Position save(PositionDto positionDto) {
        Position position = Position.builder().lat(positionDto.getLat()).lng(positionDto.getLng()).build();
        return save(position);
    }

    public Position save(Position position) {
        return this.positionRepository.save(position);
    }

    /**
     * Uses haversine formula to calculate the great-circle distance between two points
     *
     * based on https://www.movable-type.co.uk/scripts/latlong.html
     *
     * @return distance in kilometers
     */
    public double distance(Position positionA, Position positionB) {

        double phi1 = toRadians(positionA.getLat());
        double phi2 = toRadians(positionB.getLat());
        double deltaLat = toRadians(positionB.getLat() - positionA.getLat());
        double deltaLng = toRadians(positionB.getLng() - positionA.getLng());

        double a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(phi1) * Math.cos(phi2) *
                        Math.sin(deltaLng/2) * Math.sin(deltaLng/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return EATRTH_RADIUS_KM * c ;
}

    private double toRadians(double val) {
        return val * Math.PI / 180;
    }

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }
}
