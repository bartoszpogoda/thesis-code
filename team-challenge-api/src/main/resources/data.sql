
-- Test user, plain password is 'password'
INSERT INTO Users VALUES('0', 'test@test.com', '$2a$10$ve0zm7QveRaoCZbNrRAByO6bNYqF9W/jP1A2pZmHzi.4Ocai1bZ5u');

INSERT INTO Authorities VALUES('ROLE_USER');
INSERT INTO Authorities VALUES('ROLE_MOD');
INSERT INTO Authorities VALUES('ROLE_ADMIN');

INSERT Into GrantedAuthorities VALUES('0', 'ROLE_USER');
INSERT Into GrantedAuthorities VALUES('0', 'ROLE_MOD');

