
CREATE TABLE Users (
  UserID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(64) NOT NULL UNIQUE,
  EncodedPassword CHAR(60) NOT NULL,
  Fullname VARCHAR(64) NOT NULL,
  BirthdayDate DATE,
  ImagePath VARCHAR(64)
);

CREATE TABLE Authorities (
  AuthorityName VARCHAR(50) PRIMARY KEY
);

CREATE TABLE GrantedAuthorities (
  UserID VARCHAR(64) NOT NULL,
  AuthorityName VARCHAR(50) NOT NULL,

  PRIMARY KEY (UserID, AuthorityName),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (AuthorityName) REFERENCES Authorities(AuthorityName)
);

/* DISCIPLINES */
CREATE TABLE Disciplines (
  DisciplineID VARCHAR(10) PRIMARY KEY
);

/* POSITIONS */
CREATE TABLE Positions (
  PositionID VARCHAR(10) AUTO_INCREMENT PRIMARY KEY,
  Lat DOUBLE,
  Lng DOUBLE
);

/* REGIONS */
CREATE TABLE Regions (
  RegionID VARCHAR(10) PRIMARY KEY,
  Name VARCHAR(25) NOT NULL,
  CenterID VARCHAR(10) NOT NULL,

  FOREIGN KEY (CenterID) REFERENCES Positions(PositionID)
);

/* FACILITIES */
CREATE TABLE Facilities (
  FacilityID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  DisciplineID VARCHAR(10) NOT NULL,
  RegionID VARCHAR(10) NOT NULL,
  UserID VARCHAR(10),
  Name VARCHAR(64) NOT NULL,
  Address VARCHAR(32) NOT NULL,
  PositionID VARCHAR(10) NOT NULL,
  Lighting BIT,
  SurfaceType VARCHAR(20),
  PlayingSpots INTEGER,
  Description VARCHAR(200),
  TokenPrice INTEGER NOT NULL,


  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID),
  FOREIGN KEY (RegionID) REFERENCES Regions(RegionID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID), /* created by */
  FOREIGN KEY (PositionID) REFERENCES Positions(PositionID)
);

/* PLAYERS */
CREATE TABLE Players (
  PlayerID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  UserID VARCHAR(64) NOT NULL,
  TeamID VARCHAR(64),
  DisciplineID VARCHAR(64) NOT NULL,
  RegionID VARCHAR(64) NOT NULL,
  Height INTEGER,
  YearsOfExperience INTEGER,

  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID),
  FOREIGN KEY (RegionID) REFERENCES Regions(RegionID)
);

/* TEAMS */
CREATE TABLE Teams (
  TeamID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  DisciplineID VARCHAR(64) NOT NULL,
  HomeID VARCHAR(64),
  RegionID VARCHAR(10) NOT NULL,
  ManagerID VARCHAR(64) NOT NULL,
  Name VARCHAR(32) NOT NULL,
  Active BIT (1),
  Balance INTEGER,
  ImagePath VARCHAR(64),

  FOREIGN KEY (ManagerID) REFERENCES Players(PlayerID),
  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID),
  FOREIGN KEY (RegionID) REFERENCES Regions(RegionID),
  FOREIGN KEY (HomeID) REFERENCES Positions(PositionID)
);

ALTER TABLE Players ADD CONSTRAINT FK_Team_ID FOREIGN KEY (TeamID) REFERENCES Teams(TeamID);

/* TEAM INVITATIONS */
CREATE TABLE TeamInvitations (
  TeamInvitationID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  TeamID VARCHAR(64) NOT NULL,
  PlayerID VARCHAR(64) NOT NULL,

  FOREIGN KEY (TeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (PlayerID) REFERENCES Players (PlayerID),
  UNIQUE KEY (TeamID, PlayerID)
);

/* CHALLENGE STATUSES */
CREATE TABLE ChallengeStatuses (
  ChallengeStatusID INTEGER AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(10) NOT NULL
);

/* CHALLENGES */
CREATE TABLE Challenges (
  ChallengeID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  DisciplineID VARCHAR(64) NOT NULL,
  ChallengeStatusID INTEGER NOT NULL,
  ChallengingTeamID VARCHAR(64) NOT NULL,
  ChallengedTeamID VARCHAR(64) NOT NULL,
  CreationDate DATE NOT NULL,

  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID),
  FOREIGN KEY (ChallengingTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (ChallengedTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (ChallengeStatusID) REFERENCES ChallengeStatuses(ChallengeStatusID)
);

/* PLACE TIME OFFER STATUSES */
CREATE TABLE PlaceTimeOfferStatuses (
  PlaceTimeOfferStatusID INTEGER AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(10) NOT NULL
);

/* PLACE TIME OFFERS */
CREATE TABLE PlaceTimeOffers (
  PlaceTimeOfferID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  PlaceTimeOfferStatusID INTEGER NOT NULL,
  ChallengeID VARCHAR(64) NOT NULL,
  OfferingTeamID VARCHAR(64) NOT NULL,
  OfferedDate DATETIME NOT NULL,
  OfferedFacilityID VARCHAR(64) NOT NULL,

  FOREIGN KEY (ChallengeID) REFERENCES Challenges(ChallengeID),
  FOREIGN KEY (OfferingTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (PlaceTimeOfferStatusID) REFERENCES PlaceTimeOfferStatuses(PlaceTimeOfferStatusID),
  FOREIGN KEY (OfferedFacilityID) REFERENCES Facilities(FacilityID)
);

/* TEAM REVIEWS */
CREATE TABLE TeamReviews (
  TeamReviewID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  ChallengeID VARCHAR(64) NOT NULL,
  ReviewingTeamID VARCHAR(64) NOT NULL,
  ReviewedTeamID VARCHAR(64) NOT NULL,
  ReviewDate DATETIME NOT NULL,

  FairPlayLevel TINYINT UNSIGNED, /* 1 - 10 */
  PlayAgain BIT,
  BlackList BIT,

  FOREIGN KEY (ChallengeID) REFERENCES Challenges(ChallengeID),
  FOREIGN KEY (ReviewingTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (ReviewedTeamID) REFERENCES Teams(TeamID)
);


/* CHALLENGE RESULT STATUSES */
CREATE TABLE ResultStatuses (
  ResultStatusID INTEGER AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(10) NOT NULL
);

/* CHALLENGE RESULTS */
CREATE TABLE Results (
  ResultID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  ChallengeID VARCHAR(64) NOT NULL,

  WinnerTeamID VARCHAR(64) NOT NULL,
  WinnerPoints INTEGER,
  LoserPoints INTEGER,
  ReportingTeamID VARCHAR(64) NOT NULL,
  ReportedDate DATETIME NOT NULL,
  ResultStatusID INTEGER NOT NULL,

  FOREIGN KEY (ChallengeID) REFERENCES Challenges(ChallengeID),
  FOREIGN KEY (WinnerTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (ReportingTeamID) REFERENCES Teams(TeamID),
  FOREIGN KEY (ResultStatusID) REFERENCES ResultStatuses(ResultStatusID)
);