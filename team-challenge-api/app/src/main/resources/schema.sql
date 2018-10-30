
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
  Name VARCHAR(64) NOT NULL,

  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID)
);

CREATE TABLE OpenFacilities (
  FacilityID VARCHAR(64) NOT NULL,
  Temp VARCHAR(64) NOT NULL,

  PRIMARY KEY (FacilityID),
  FOREIGN KEY (FacilityID) REFERENCES Facilities(FacilityID)
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