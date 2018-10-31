
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

-- Positions
INSERT INTO Positions VALUES('1', 51.110736, 17.033733); -- Wro center
INSERT INTO Positions VALUES('2', 50.436043, 16.650231); -- Kłodzko center
INSERT INTO Positions VALUES('3', 51.109616414244435, 17.094840375208946); -- Boisko przy SP45 Wroclaw


-- Regions
INSERT INTO Regions VALUES('wro', 'Wrocław', '1');
INSERT INTO Regions VALUES('dkl', 'Kłodzko', '2');

-- Test facilities
INSERT INTO Facilities VALUES('0', '3x3basket', 'dkl', 'SP7 Klodzko', '2', TRUE, 'Beton', 2, 'Opis..', 100);
INSERT INTO Facilities VALUES('1', '3x3basket', 'wro', 'Boisko przy Szkole Podstawowej nr 45', '3', FALSE, 'Beton', 4, 'Opis..', 100);

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

