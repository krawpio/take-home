CREATE TABLE apartment (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    area real,
    price real,
    rooms INTEGER,
    createdDate DATE,
    lat real,
    long real,
    rentable bool,
    realtorId INTEGER references account(id)
);



INSERT INTO apartment(name, description, address, area, price, rooms, createddate, lat, long) values
('Aparment', 'nice apartment', 'Warsaw', 123, 40, 5, '2021-04-01'::date, 52.229676, 21.012229);
