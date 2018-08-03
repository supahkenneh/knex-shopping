\c postgres;

DROP DATABASE IF EXISTS knex_shopping;
DROP USER IF EXISTS knex_shopping_user;

CREATE USER knex_shopping_user WITH PASSWORD 'password';
CREATE DATABASE knex_shopping WITH OWNER knex_shopping_user;

\c knex_shopping knex_shopping_user;

CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id serial NOT NULL PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text,
  inventory integer,
  price decimal(8, 2),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cart (
  id serial NOT NULL PRIMARY KEY,
  user_id integer REFERENCES users(id), 
  products_id integer REFERENCES products(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (email, password, created_at, updated_at) 
VALUES (
  'whatever@gmail.com',
  'password',
  default,
  default
)
RETURNING *;

INSERT INTO products
VALUES (
  default,
  'shoes',
  'for walking',
  1,
  32.50,
  default,
  default
)
RETURNING *;

INSERT INTO products
VALUES (
  default,
  'phone',
  'for texting',
  1,
  1000,
  default,
  default
)
RETURNING *;