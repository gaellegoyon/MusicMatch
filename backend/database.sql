/* On desactive la verification des clés étrangères*/
SET foreign_key_checks = 0;



DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    artistname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
     age int not null,
    city varchar(255) NOT NULL,
    biography varchar(255) null default null,
    soundcloud varchar(255) null default null,
    youtube varchar (255) null default null,
        avatar varchar(255) null default null,
    creationdate datetime null default now(),
    isadmin TINYINT NULL DEFAULT '0',
    hashedPassword varchar(255) NOT NULL,
        passwordtoken varchar(100) null default null

) ENGINE = InnoDB DEFAULT CHARSET = utf8;


INSERT INTO
  user (artistname, email, age, city, biography, soundcloud, youtube, avatar, hashedPassword)
VALUES
  (
    'Joe',
    'joe@gmail.com',
    32,
    'Paris',
    "Hello, je suis à la recherche d'un groupe de musique dans la métropole parisienne !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "joe.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),  (
    'Maëlle',
    'maelle@gmail.com',
    24,
    'Montpellier',
    "Hey les musicos ! Je suis chanteuse et pianiste et je recherche un guitariste pour m'accompagner.",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "maelle.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),  (
    'Gaëtan',
    'gaetan@gmail.com',
    27,
    'Nantes',
    "Je fais de la MAO sur Nantes. Je suis à la recherche de collab !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "gaetan.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),

  (
    'Bastien',
    'bastien@gmail.com',
    17,
    'Paris',
    "A la recherche d'un groupe pour progresser !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "bastien.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),
  (
    'Justin',
    'justin@gmail.com',
    32,
    'Lyon',
    "A la recherche de nouvelles collabs !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "justin.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ")
  ;



  DROP TABLE IF EXISTS skill;
CREATE TABLE skill (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  skillname varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO skill (skillname) VALUES ('Guitariste'),
('Chanteur(euse)'), ('Violoniste'), ('Pianiste'), ('Compositeur(trice)'), ('Music Lover'), ('Producteur(trice)'),('Rappeur'), ('Bassiste'), ('Batteur'), ('DJ'), ('Groupe'), ('Beatmaker'), ('Saxophoniste');


DROP TABLE IF EXISTS user_has_skills;
CREATE TABLE user_has_skills (
  skill_id int NOT NULL,
  user_id int not null,

  constraint fk_user_has_skills_skill1
  foreign key (skill_id) references skill(id),
  constraint fk_user_has_skills_user1
  foreign key (user_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




INSERT INTO user_has_skills (skill_id, user_id) VALUES (1,1),
(6,1), (2,2), (4,2), (6,2), (5,3), (7,3), (13,3), (1,4),(10,4),(2,4), (4,4), (1,5), (2,5), (4,5);






DROP TABLE IF EXISTS style;
CREATE TABLE style (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  stylename varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO style (stylename) VALUES ('Rock'), ('R&B/Soul'), ('Indie'), ('Metal'), ('Electronic'), ('Blues'), ('Jazz'), ('Classique'), ('Funk'), ('Trap'), ('Punk'), ('Folk'), ('Reggae'), ('Country'), ('EDM'), ('House'), ('Gospel'), ('K-Pop'),('Hip Hop'), ('Pop'), ('Rock (Alt.)');

DROP TABLE IF EXISTS user_has_styles;
CREATE TABLE user_has_styles (
  style_id int NOT NULL,
  user_id int not null,
  constraint fk_user_has_styles_style1
  foreign key (style_id) references style(id),
  constraint fk_user_had_styles_user1
  foreign key (user_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO user_has_styles (style_id, user_id) VALUES (1,1),
(3,1), (21,1), (3,2), (8,2), (20,2), (5,3), (10,3), (16,3), (20,3), (6,4), (7,4),(8,4), (7,5), (8,5) ;



DROP TABLE IF EXISTS user_like;
CREATE TABLE user_like (
  user1_id int NOT NULL,
  user2_id int NOT NULL,
  isliked TINYINT NULL DEFAULT '0',
  isshown tinyint null default '1',
  constraint fk_user_has_match_user1
  foreign key (user2_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;










/* On reactive la verification des clés étrangères*/
SET foreign_key_checks = 1;


