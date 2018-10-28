package com.github.bartoszpogoda.thesis.teamchallengeapi.core.position;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.stereotype.Service;

@Service
public class PositionService {

    private PositionRepository positionRepository;

    public Position save(PositionDto positionDto) {
        Position position = Position.builder().lat(positionDto.getLat()).lng(positionDto.getLng()).build();
        return this.positionRepository.save(position);
    }

    public double distance(Position positionA, Position positionB) {
        // TODO implemented based on https://www.movable-type.co.uk/scripts/latlong.html
        throw new NotYetImplementedException();
    }

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }
}
