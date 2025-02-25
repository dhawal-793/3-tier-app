-- DO $$
-- BEGIN
--     IF NOT EXISTS (
--         SELECT 1 FROM pg_roles WHERE rolname = 'demo_user'
--     ) THEN
--         CREATE ROLE demo_user WITH LOGIN PASSWORD 'demo_user';
--     END IF;
-- END $$;

-- DO $$
-- BEGIN
--     IF NOT EXISTS (
--         SELECT 1 FROM pg_database WHERE datname = 'demo_db'
--     ) THEN
--         CREATE DATABASE demo_db WITH OWNER demo_user;
--     END IF;
-- END $$;

-- GRANT ALL PRIVILEGES ON DATABASE demo_db TO demo_user;


CREATE TABLE IF NOT EXISTS country_and_capitals (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    capital TEXT NOT NULL
);

insert into country_and_capitals(country, capital) values ('India', 'Delhi');
insert into country_and_capitals(country, capital) values ('China', 'Beijing');
insert into country_and_capitals(country, capital) values ('Bhutan', 'Thimpu');
insert into country_and_capitals(country, capital) values ('Russia', 'Moscow');
insert into country_and_capitals(country, capital) values ('America', 'Washington');
insert into country_and_capitals(country, capital) values ('England', 'London');