
CREATE TABLE Users (
  UserID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(64) NOT NULL UNIQUE,
  EncodedPassword CHAR(60) NOT NULL,
  Fullname VARCHAR(64) NOT NULL,
  BirthdayDate DATE
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

/* REGIONS */

CREATE TABLE Regions (
  RegionID VARCHAR(10) PRIMARY KEY,
  Name VARCHAR(25) NOT NULL
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
  DisciplineID VARCHAR(64) NOT NULL,
  Height INTEGER,
  YearsOfExperience INTEGER,

  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID)
);

CREATE TABLE Basket3x3PlayerProfiles (
  ProfileID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  PlayerID VARCHAR(64) NOT NULL,
  Height INTEGER,
  Weight INTEGER,
  LongThrowAccuracy DOUBLE,
  PersonalThrowAccuracy DOUBLE,
  YearsOfExperience INTEGER,

  FOREIGN  KEY (PlayerID) REFERENCES Players(PlayerID)
)