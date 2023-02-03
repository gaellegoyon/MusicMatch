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
    'Justin',
    'justin@gmail.com',
    32,
    'Lyon',
    "A la recherche de nouvelles collabs !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "justin.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),
  -- (
  --   'Jessica',
  --   'jessica@gmail.com',
  --   29,
  --   'Strasbourg',
  --   "Bonjour à tous, je suis violoniste et j'aimerais rejoindre un orchestre",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "jessica.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ),
  -- (
  --   'Aaron',
  --   'aaron@gmail.com',
  --   42,
  --   'Nîmes',
  --   "A la recherche d'autres passionés de musique comme moi pour collab",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "aaron.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ),
  (
    'Leo',
    'leo@gmail.com',
    33,
    'Paris',
    "A la recherche d'autres passionés de musique comme moi pour collab !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "leo.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ),
  -- (
  --   'Juliette',
  --   'juliette@gmail.com',
  --   25,
  --   'Lyon',
  --   "Grande passionnée de musique, à la recherche d'autres passionnés pour passer un bon moment !",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "juliette.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ),
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
  -- (
  --   'Sébastien',
  --   'sebastien@gmail.com',
  --   29,
  --   'Nantes',
  --   "Passionné de rap et de MAO !",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "sebastien.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ), (
  --   'Flor',
  --   'flor@gmail.com',
  --   31,
  --   'Paris',
  --   "Grande passionnée de musique, à la recherche d'autres passionnés pour passer un bon moment !",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "flor.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ), (
  --   'Camille',
  --   'camille@gmail.com',
  --   27,
  --   'Lyon',
  --   "Grande passionnée de musique, à la recherche d'autres passionnés pour passer un bon moment !",
  --   "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  --   "https://www.youtube.com/@UKNickWilson",
  --   "camille.jpg",
  --   "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  -- ),
  (
    'Owen',
    'owen@gmail.com',
    31,
    'Grenoble',
    "Fan de musique électronique !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "owen.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  ), (
    'Quentin',
    'quentin@gmail.com',
    33,
    'Lyon',
    "Grand passionnée de batterie, à la recherche d'autres passionnés pour passer un bon moment !",
    "https://soundcloud.com/ga-lle-goyon?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/@UKNickWilson",
    "quentin.jpg",
    "$argon2i$v=19$m=16,t=2,p=1$RGJpUzNLVERMMndiSVlPRg$qCzM78rc9iqt0qYZt/PWiQ"
  );



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
(6,1), (2,2), (4,2), (6,2), (5,3), (7,3), (13,3), (1,1),
(6,1), (2,2), (4,2), (6,2), (5,3), (7,3), (13,3),(1,4),(10,4),(2,4), (4,4), (3,5), (5,5), (4,5),(10,6), (1,6), (2,6), (19,6), (3,7), (2,7), (4,7), (5,7), (2,8), (4,8), (6,8), (1,9), (10,9), (7,10), (11,10), (16,10), (1,11), (10,11), (2,11), (4,11), (1,12), (4,12), (6,13), (11,13), (1,14), (10,14), (3,14), (6,14);






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
(3,1), (21,1), (3,2), (8,2), (20,2), (5,3), (10,3), (16,3), (20,3), (6,4), (7,4),(8,4), (7,5), (8,5), (1,6), (6,6), (7,6), (12,6), (14,6),(8,7), (12,7), (7,7), (2,8), (12,8), (20,8),(3,9), (12,9), (20,9), (21,9), (2,10), (10,10), (3,11), (12,11), (20,11), (21,11), (1,12), (21,12), (20,12), (20,13), (19,13), (16,13), (15,13), (1,14), (21,14) ;



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


