package com.github.bartoszpogoda.thesis.teamchallengeapi.core.teaminvitation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.player.Player;
import com.github.bartoszpogoda.thesis.teamchallengeapi.core.team.Team;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "TeamInvitations")
@Builder
public class TeamInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TeamInvitationID")
    private String id;

    @ManyToOne
    @JoinColumn(name = "TeamID")
    private Team targetTeam;

    @ManyToOne
    @JoinColumn(name = "PlayerID")
    private Player targetPlayer;

}
