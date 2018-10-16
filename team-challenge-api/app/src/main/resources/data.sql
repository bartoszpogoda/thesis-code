
-- Test user, plain password is 'password'
INSERT INTO Users VALUES('0', 'test@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Kevin Best', '1996-11-16');
INSERT INTO Users VALUES('1', 'admin@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Admin Kevin', '1990-11-11');
INSERT INTO Users VALUES('2', 'player1@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Player One', '1999-12-03');

INSERT INTO Authorities VALUES('ROLE_USER');
INSERT INTO Authorities VALUES('ROLE_MOD');
INSERT INTO Authorities VALUES('ROLE_ADMIN');

INSERT Into GrantedAuthorities VALUES('0', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('0', 'ROLE_MOD');
INSERT Into GrantedAuthorities VALUES('1', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('1', 'ROLE_MOD');
INSERT Into GrantedAuthorities VALUES('1', 'ROLE_ADMIN');

-- Disciplines
INSERT INTO Disciplines VALUES('3x3basket');

-- Regions
INSERT INTO Regions VALUES('wro', 'Wrocław');

-- Test facilities
INSERT INTO Facilities VALUES('0', '3x3basket', 'SP7 Klodzko');
INSERT INTO OpenFacilities VALUES('0', 'Temp');

-- Test players
INSERT INTO Players VALUES('1', '2', NULL, '3x3basket', 190, 3);