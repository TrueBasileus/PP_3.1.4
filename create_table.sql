CREATE TABLE users (
                       id BIGINT UNSIGNED AUTO_INCREMENT,
                       name VARCHAR(40) NOT NULL,
                       surname VARCHAR(50) NOT NULL,
                       age INT,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(50) UNIQUE,
                       PRIMARY KEY (id)
);

CREATE TABLE roles (
                       id INT UNSIGNED AUTO_INCREMENT,
                       name VARCHAR(50) NOT NULL,
                       PRIMARY KEY (id)
);

CREATE TABLE user_role (
                             user_id INT UNSIGNED NOT NULL,
                             role_id INT UNSIGNED NOT NULL,
                             PRIMARY KEY (user_id, role_id),
                             FOREIGN KEY (user_id) REFERENCES users(id),
                             FOREIGN KEY (role_id) REFERENCES roles(id)
);

insert into roles(name)
values
    ('ROLE_ADMIN'), ('ROLE_USER');
insert into users (name,surname, age,password,email)
values ('Давид', 'Михайлов', 15, '$2y$10$RActNQEN6Lwglg5Wzd89me1UpHJfhJX7K6NMzdf87OevoVwrxb/2S','david@gmail.com');
# password = 100

insert into users (name, surname, age,password,email)
values ('Артём','Мухамедов',95, '$2y$10$RActNQEN6Lwglg5Wzd89me1UpHJfhJX7K6NMzdf87OevoVwrxb/2S','tema@gmail.com');
# password = 100

insert into user_role (user_id, role_id) values (1,1), (2,2);