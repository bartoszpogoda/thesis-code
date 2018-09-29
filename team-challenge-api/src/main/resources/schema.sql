
CREATE TABLE Users (
  UserID VARCHAR(64) AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(64) NOT NULL UNIQUE,
  EncodedPassword CHAR(60) NOT NULL,
  Fullname VARCHAR(64) NOT NULL
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