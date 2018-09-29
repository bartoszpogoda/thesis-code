
-- Test user, plain password is 'password'
INSERT INTO Users VALUES('0', 'test@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u', 'Kevin Best');

INSERT INTO Authorities VALUES('ROLE_USER');
INSERT INTO Authorities VALUES('ROLE_MOD');
INSERT INTO Authorities VALUES('ROLE_ADMIN');

INSERT Into GrantedAuthorities VALUES('0', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('0', 'ROLE_MOD');

-- Disciplines
INSERT INTO Disciplines VALUES('3x3basket');

-- Test facilities
INSERT INTO Facilities VALUES('0', '3x3basket', 'SP7 Klodzko');
INSERT INTO OpenFacilities VALUES('0', 'Temp');
