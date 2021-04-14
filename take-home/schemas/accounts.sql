CREATE TYPE ROLE AS ENUM ('ADMIN', 'REALTOR', 'CLIENT');

CREATE TABLE account
(
    id        integer primary key,
    login     text,
    password  text,
    firstName text,
    lastName  text,
    role      ROLE
);

INSERT INTO account(login, password, firstName, lastName, role) values
    ('admin', 'pass', 'John', 'Admin', 'ADMIN'),
    ('realtor', 'pass', 'John', 'Realtor', 'REALTOR'),
    ('client', 'pass', 'John', 'Client', 'CLIENT');


