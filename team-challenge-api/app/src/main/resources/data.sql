
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
INSERT INTO Disciplines VALUES('3x3basket');

-- Regions
INSERT INTO Regions VALUES('wro', 'Wrocław');

-- Test facilities
INSERT INTO Facilities VALUES('0', '3x3basket', 'SP7 Klodzko');
INSERT INTO OpenFacilities VALUES('0', 'Temp');

-- Test players
INSERT INTO Players VALUES('1', '2', NULL, '3x3basket', 190, 3);
INSERT INTO Players VALUES('2', '4', NULL, '3x3basket', 195, 7);
INSERT INTO Players VALUES('3', '3', NULL, '3x3basket', 184, 3);
INSERT INTO Players VALUES('4', '5', NULL, '3x3basket', 178, 3);
INSERT INTO Players VALUES('5', '6', NULL, '3x3basket', 192, 4);
INSERT INTO Players VALUES('6', '7', NULL, '3x3basket', 155, 1);
INSERT INTO Players VALUES('7', '8', NULL, '3x3basket', 163, 2);
INSERT INTO Players VALUES('8', '9', NULL, '3x3basket', 188, 1);
INSERT INTO Players VALUES('9', '10', NULL, '3x3basket', 177, 3);
INSERT INTO Players VALUES('10', '11', NULL, '3x3basket', 166, 4);
INSERT INTO Players VALUES('11', '12', NULL, '3x3basket', 156, 5);

-- Test teams
INSERT INTO Teams (DisciplineID, RegionID, ManagerID, Name, Active, Balance) VALUES('3x3basket', 'wro', '2', 'TEAM Rodzinka', 0, 100);

-- Test team memberships
UPDATE Players SET TeamID = '1' WHERE PlayerID = '2';

-- Test team invitations
INSERT INTO TeamInvitations VALUES('1', '1', '3');

