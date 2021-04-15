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
    realtorId INTEGER references account(id) ON DELETE CASCADE ON UPDATE CASCADE
);
