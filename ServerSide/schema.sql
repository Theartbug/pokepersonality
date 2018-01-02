CREATE DATABASE pokepersonality;

CREATE TABLE pokemon (dex_number INTEGER UNIQUE PRIMARY KEY, name VARCHAR(25), img_url VARCHAR(300), type_1 VARCHAR(25), type_2 VARCHAR(25), color VARCHAR(25), dex_entry VARCHAR(500), growth VARCHAR(25), shape VARCHAR(25), egg_group1 VARCHAR(25), egg_group2 VARCHAR(25), gender INTEGER);