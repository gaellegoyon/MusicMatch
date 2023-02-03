const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.connection.query(
      `select id, artistname, email, age, city, biography, soundcloud, youtube, avatar from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [email]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, artistname, email, age, city, biography, soundcloud, youtube, avatar from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (email, artistname, age, city, hashedPassword) values (?, ?, ?, ?, ?)`,
      [user.email, user.artistname, user.age, user.city, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set artistname = ?, email = ?, age = ?, city = ?, biography = ?, soundcloud = ?, youtube = ? where id = ?`,
      [
        user.artistname,
        user.email,
        user.age,
        user.city,
        user.biography,
        user.soundcloud,
        user.youtube,
        user.id,
      ]
    );
  }

  updateAvatar(id, avatar) {
    return this.connection.query(
      `update ${this.table} set avatar = ? where id = ?`,
      [avatar, id]
    );
  }

  findAllUsers() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  findSkills() {
    return this.connection.query(
      `select * from ${this.table} as u
    left join user_has_skills as uhsk on u.id = uhsk.user_id
    left join skill as sk on sk.id = uhsk.skill_id`
    );
  }
}

module.exports = UserManager;
