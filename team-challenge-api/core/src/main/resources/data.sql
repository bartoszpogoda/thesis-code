--- PRODUCTION READY DATA

-- Place Time Offer Statuses
INSERT INTO PlaceTimeOfferStatuses VALUES(0, 'Pending');
INSERT INTO PlaceTimeOfferStatuses VALUES(1, 'Accepted');
INSERT INTO PlaceTimeOfferStatuses VALUES(2, 'Rejected');
INSERT INTO PlaceTimeOfferStatuses VALUES(3, 'Cancelled');

-- Challenge Statuses
INSERT INTO ChallengeStatuses VALUES(0, 'Pending');
INSERT INTO ChallengeStatuses VALUES(1, 'Accepted');
INSERT INTO ChallengeStatuses VALUES(2, 'Rejected');
INSERT INTO ChallengeStatuses VALUES(3, 'Canceled');
INSERT INTO ChallengeStatuses VALUES(4, 'Finished');

-- ResultDto Statuses
INSERT INTO ResultStatuses VALUES(0, 'Reported');
INSERT INTO ResultStatuses VALUES(1, 'Accepted');
INSERT INTO ResultStatuses VALUES(2, 'Rejected');


--- TEST DATA

-- Test user, plain password is 'password'
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('test@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Kevin Best', '1996-11-16');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('admin@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Admin Kevin', '1990-11-11');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player1@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player One', '1999-12-03');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player2@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player Two', '1996-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('manager1@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Manager One', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player3@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player 3', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player4@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player 4', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player5@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player 5', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player6@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The Player 6', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player7@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The Player 7', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player8@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The Player 8', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player9@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The Player 9', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('player10@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player 10', '1994-01-15');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('user1@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The User 1', '1991-03-12');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('user2@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The User 2', '1990-01-16');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('user3@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The User 3', '1991-01-11');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('user4@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'The User 4', '1992-08-10');
INSERT INTO Users (Email, EncodedPassword, Fullname, BirthdayDate) VALUES('user5@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'User 5', '1993-12-12');


INSERT INTO Authorities VALUES('ROLE_USER');
INSERT INTO Authorities VALUES('ROLE_MOD');
INSERT INTO Authorities VALUES('ROLE_ADMIN');

INSERT Into GrantedAuthorities VALUES('1', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('1', 'ROLE_MOD');
INSERT Into GrantedAuthorities VALUES('2', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('2', 'ROLE_MOD');
INSERT Into GrantedAuthorities VALUES('2', 'ROLE_ADMIN');

-- Disciplines
INSERT INTO Disciplines VALUES('3x3basket', 3, 5);

-- Positions
INSERT INTO Positions VALUES('1', 51.110736, 17.033733); -- Wro center
INSERT INTO Positions VALUES('2', 50.436043, 16.650231); -- Kłodzko center
INSERT INTO Positions VALUES('3', 51.109616414244435, 17.094840375208946); -- Boisko przy SP45 Wroclaw


-- Regions
INSERT INTO Regions VALUES('wro', 'Wrocław', '1');
INSERT INTO Regions VALUES('dkl', 'Kłodzko', '2');

-- Test facilities
INSERT INTO Facilities VALUES('0', '3x3basket', 'dkl', NULL, 'SP7 Klodzko', 'Sienkiewicza 3', '2', TRUE, 'Beton', 2, 'Opis..', 100);
INSERT INTO Facilities VALUES('1', '3x3basket', 'wro', NULL, 'Boisko przy Szkole Podstawowej nr 45', 'Ulica', '3', FALSE, 'Beton', 4, 'Opis..', 100);

-- Test players
INSERT INTO Players VALUES('1', '2', NULL, '3x3basket', 'wro', 190, 3);
INSERT INTO Players VALUES('2', '4', NULL, '3x3basket', 'wro', 195, 7);
INSERT INTO Players VALUES('3', '3', NULL, '3x3basket', 'wro', 184, 3);
INSERT INTO Players VALUES('4', '5', NULL, '3x3basket', 'wro', 178, 3);
INSERT INTO Players VALUES('5', '6', NULL, '3x3basket', 'wro', 192, 4);
INSERT INTO Players VALUES('6', '7', NULL, '3x3basket', 'wro', 155, 1);
INSERT INTO Players VALUES('7', '8', NULL, '3x3basket', 'wro', 163, 2);
INSERT INTO Players VALUES('8', '9', NULL, '3x3basket', 'wro', 188, 1);
INSERT INTO Players VALUES('9', '10', NULL, '3x3basket', 'wro', 177, 3);
INSERT INTO Players VALUES('10', '11', NULL, '3x3basket', 'wro', 166, 4);
INSERT INTO Players VALUES('11', '12', NULL, '3x3basket', 'wro', 156, 5);

-- Test teams
INSERT INTO Teams (DisciplineID, RegionID, ManagerID, Name, Active, Balance) VALUES('3x3basket', 'wro', '2', 'TEAM Rodzinka', 0, 100);

-- Test team memberships
UPDATE Players SET TeamID = '1' WHERE PlayerID = '2';

-- Test team invitations
INSERT INTO TeamInvitations VALUES('1', '1', '3');


-- Drużyna studentów elektroniki PWR, średnio zaawansowani (2-3 lata doświadczenia)
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('300', 'mm1@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W4 1', '1996-10-12');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('301', 'mm2@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W4 2', '1996-12-10');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('302', 'mm3@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W4 3', '1995-01-12');

INSERT INTO Players VALUES('300', '300', NULL, '3x3basket', 'wro', 182, 2);
INSERT INTO Positions VALUES('300', 51.108961, 17.0591722); -- Budynek C1

INSERT INTO Teams (TeamId, DisciplineID, HomeID, RegionID, ManagerID, Name, Active, Balance)
VALUES('300', '3x3basket', '300', 'wro', '300', 'PWR Elektronika', 1, 100);

UPDATE Players SET TeamID = '300' WHERE PlayerID = '300';
INSERT INTO Players VALUES('301', '301', '300', '3x3basket', 'wro', 176, 2);
INSERT INTO Players VALUES('302', '302', '300', '3x3basket', 'wro', 184, 3);


-- Drużyna studentów mechaniki PWR, średnio zaawansowani (2-3 lata doświadczenia)
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('303', 'mm4@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W10 1', '1993-09-12');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('304', 'mm5@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W10 2', '1995-02-10');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('305', 'mm6@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Student W10 3', '1994-01-12');

INSERT INTO Players VALUES('303', '303', NULL, '3x3basket', 'wro', 170, 3);
INSERT INTO Positions VALUES('303', 51.108218, 17.065157); -- Budynek wydziału mechanicznego

INSERT INTO Teams (TeamId, DisciplineID, HomeID, RegionID, ManagerID, Name, Active, Balance)
VALUES('303', '3x3basket', '303', 'wro', '303', 'PWR Mechanika', 1, 100);

UPDATE Players SET TeamID = '303' WHERE PlayerID = '303';
INSERT INTO Players VALUES('304', '304', '303', '3x3basket', 'wro', 180, 2);
INSERT INTO Players VALUES('305', '305', '303', '3x3basket', 'wro', 185, 3);



-- Drużyna seniorow Sepolno (50-60 lat)
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('306', 'mm7@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Senior Sepolno 1', '1968-11-20');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('307', 'mm8@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Senior Sepolno 2', '1965-05-07');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('308', 'mm9@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Senior Seplno 3', '1969-02-13');

INSERT INTO Players VALUES('306', '306', NULL, '3x3basket', 'wro', 165, 5);
INSERT INTO Positions VALUES('306', 51.109952, 17.098530); -- Centrum sepolna

INSERT INTO Teams (TeamId, DisciplineID, HomeID, RegionID, ManagerID, Name, Active, Balance)
VALUES('306', '3x3basket', '306', 'wro', '306', 'Seniorzy Sepolno', 1, 100);

UPDATE Players SET TeamID = '306' WHERE PlayerID = '306';
INSERT INTO Players VALUES('307', '307', '306', '3x3basket', 'wro', 168, 3);
INSERT INTO Players VALUES('308', '308', '306', '3x3basket', 'wro', 170, 6);


-- Juniorzy Sepolno (13-15 lat)
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('309', 'mm10@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Sepolno 1', '2005-11-20');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('310', 'mm11@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Sepolno 2', '2004-05-07');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('311', 'mm12@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Seplno 3', '2004-02-13');

INSERT INTO Players VALUES('309', '309', NULL, '3x3basket', 'wro', 163, 1);
INSERT INTO Positions VALUES('309', 51.109568, 17.095805); -- SP nr 45 na sepolnie

INSERT INTO Teams (TeamId, DisciplineID, HomeID, RegionID, ManagerID, Name, Active, Balance)
VALUES('309', '3x3basket', '309', 'wro', '309', 'Juniorzy Sepolno SP45', 1, 100);

UPDATE Players SET TeamID = '309' WHERE PlayerID = '309';
INSERT INTO Players VALUES('310', '310', '309', '3x3basket', 'wro', 158, 2);
INSERT INTO Players VALUES('311', '311', '309', '3x3basket', 'wro', 163, 1);


-- Juniorzy Centrum (13-15 lat)
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('312', 'mm13@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Centrum 1', '2005-07-22');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('313', 'mm14@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Centrum 2', '2004-05-03');
INSERT INTO Users (UserId, Email, EncodedPassword, Fullname, BirthdayDate)
VALUES('314', 'mm15@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Junior Centrum 3', '2005-01-12');

INSERT INTO Players VALUES('312', '312', NULL, '3x3basket', 'wro', 165, 2);
INSERT INTO Positions VALUES('312', 51.106060, 17.036367); -- SP nr 63 centrum

INSERT INTO Teams (TeamId, DisciplineID, HomeID, RegionID, ManagerID, Name, Active, Balance)
VALUES('312', '3x3basket', '312', 'wro', '312', 'Juniorzy Centrum SP63', 1, 100);

UPDATE Players SET TeamID = '312' WHERE PlayerID = '312';
INSERT INTO Players VALUES('313', '313', '312', '3x3basket', 'wro', 160, 1);
INSERT INTO Players VALUES('314', '314', '312', '3x3basket', 'wro', 164, 2);



