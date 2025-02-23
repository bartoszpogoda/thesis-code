package com.github.bartoszpogoda.thesis.teamchallengeapi.core.mapping;

import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.Challenge;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.model.ChallengeDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.PlaceTimeOffer;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.placetimeoffer.model.PlaceTimeOfferDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.Result;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.challenge.result.model.ResultDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.Facility;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.facility.model.FacilityDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.Criteria;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.SearchResult;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.ScoredTeam;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.BooleanCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NormalizedCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.algorithm.criterion.NumericCriterion;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.BooleanCriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.CriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.comparison.NumericCriteriaDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search.ScoredTeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.matchmaking.model.search.SearchResultDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.PlayerService;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.model.PlayerDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.Position;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.position.model.PositionDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.Region;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.region.model.RegionDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.TeamReview;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.review.model.TeamReviewDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.model.TeamDto;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.TeamInvitation;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation.model.TeamInvitationDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class DtoMappingService {

    private ModelMapper modelMapper;

    private PlayerService playerService;

    public PlayerDto mapToDto(Player player) {
        PlayerDto playerDto = modelMapper.map(player, PlayerDto.class);

        playerDto.setFullName(player.getUser().getFullName());
        playerDto.setAge(playerService.calculateAge(player.getUser().getBirthdayDate()));
        playerDto.setTeamName(player.getTeam() == null ? "" : player.getTeam().getName());
        playerDto.setHasImage(player.getUser().getImagePath() != null);
        playerDto.setTeamId(player.getTeam() == null ? null : player.getTeam().getId());

        return playerDto;
    }

    public TeamDto mapToDto(Team team) {
        TeamDto teamDto = modelMapper.map(team, TeamDto.class);

        teamDto.setManagerName(team.getManager().getUser().getFullName());
        teamDto.setManagerId(team.getManager().getId());
        teamDto.setHasImage(team.getImagePath() != null);

        return teamDto;
    }

    public TeamInvitationDto mapToDto(TeamInvitation teamInvitation) {
        TeamInvitationDto teamInvitationDto = modelMapper.map(teamInvitation, TeamInvitationDto.class);

        teamInvitationDto.setPlayerId(teamInvitation.getTargetPlayer().getId());
        teamInvitationDto.setTeamId(teamInvitation.getTargetTeam().getId());
        teamInvitationDto.setTeamName(teamInvitation.getTargetTeam().getName());
        teamInvitationDto.setTeamManagerName(teamInvitation.getTargetTeam().getManager().getUser().getFullName());
        teamInvitationDto.setPlayerName(teamInvitation.getTargetPlayer().getUser().getFullName());

        return teamInvitationDto;
    }

    public PositionDto mapToDto(Position position) {
        return modelMapper.map(position, PositionDto.class);
    }


    public RegionDto mapToDto(Region region) {
        RegionDto regionDto =  modelMapper.map(region, RegionDto.class);

        regionDto.setCenter(mapToDto(region.getCenter()));

        return regionDto;
    }

    public FacilityDto mapToDto(Facility facility) {
        FacilityDto facilityDto =  modelMapper.map(facility, FacilityDto.class);

        facilityDto.setPosition(mapToDto(facility.getPosition()));

        return facilityDto;
    }

    public PlaceTimeOfferDto mapToDto(PlaceTimeOffer placeTimeOffer) {
        PlaceTimeOfferDto placeTimeOfferDto = modelMapper.map(placeTimeOffer, PlaceTimeOfferDto.class);

        placeTimeOfferDto.setOfferingTeamId(placeTimeOffer.getOfferingTeam().getId());
        placeTimeOfferDto.setOfferedFacility(mapToDto(placeTimeOffer.getOfferedFacility()));

        return placeTimeOfferDto;
    }

    public ChallengeDto mapToDto(Challenge challenge) {
        ChallengeDto challengeDto = new ChallengeDto();

        challengeDto.setChallengedTeamId(challenge.getChallengedTeam().getId());
        challengeDto.setChallengedTeam(mapToDto(challenge.getChallengedTeam()));
        challengeDto.setChallengingTeamId(challenge.getChallengingTeam().getId());
        challengeDto.setChallengingTeam(mapToDto(challenge.getChallengingTeam()));
        challengeDto.setDisciplineId(challenge.getDisciplineId());
        challengeDto.setId(challenge.getId());
        challengeDto.setStatus(challenge.getStatus());

        return challengeDto;
    }

    public ResultDto mapToDto(Result result) {
        return modelMapper.map(result, ResultDto.class);
    }

    public CriteriaDto mapToDto(Criteria criteria) {
        CriteriaDto comparisonDto = new CriteriaDto();

        comparisonDto.setNumericCriteria(criteria.getNormalizedNumericCriteria().stream()
                .map(this::mapNumericCriteria).collect(Collectors.toList()));

        comparisonDto.setBooleanCriteria(criteria.getNormalizedBooleanCriteria().stream()
                .map(this::mapBooleanCriteria).collect(Collectors.toList()));

        return comparisonDto;
    }

    private BooleanCriteriaDto mapBooleanCriteria(NormalizedCriterion<BooleanCriterion> criteria) {
        BooleanCriteriaDto booleanCriteriaDto = new BooleanCriteriaDto();

        booleanCriteriaDto.setValue(criteria.getOriginalCriteria().isValue());
        booleanCriteriaDto.setType(criteria.getOriginalCriteria().getType().toString());

        return booleanCriteriaDto;
    }

    private NumericCriteriaDto mapNumericCriteria(NormalizedCriterion<NumericCriterion> criteria) {
        NumericCriteriaDto numericCriteriaDto = new NumericCriteriaDto();

        numericCriteriaDto.setDifference(criteria.getOriginalCriteria().getValue());
        numericCriteriaDto.setOrigin(criteria.getOriginalCriteria().getOrigin());
        numericCriteriaDto.setNormalized(criteria.getNormalizedValue());
        numericCriteriaDto.setType(criteria.getOriginalCriteria().getType().toString());

        return numericCriteriaDto;
    }

    public SearchResultDto mapToDto(SearchResult searchResult) {
        SearchResultDto searchResultDto = new SearchResultDto();

        searchResultDto.setResults(searchResult.getResults().stream().map(this::mapToDto).collect(Collectors.toList()));

        return searchResultDto;
    }

    private ScoredTeamDto mapToDto(ScoredTeam scoredTeam) {
        ScoredTeamDto scoredTeamDto = new ScoredTeamDto();

        scoredTeamDto.setTeam(mapToDto(scoredTeam.getTeam()));
        scoredTeamDto.setTotalScore(scoredTeam.getTotalScore());
        scoredTeamDto.setCriteria(mapToDto(scoredTeam.getCriteria()));

        return scoredTeamDto;
    }

    public TeamReviewDto mapToDto(TeamReview teamReview) {
        TeamReviewDto teamReviewDto = modelMapper.map(teamReview, TeamReviewDto.class);

        return teamReviewDto;
    }


    public DtoMappingService(ModelMapper modelMapper, PlayerService playerService) {
        this.modelMapper = modelMapper;
        this.playerService = playerService;
    }
}
