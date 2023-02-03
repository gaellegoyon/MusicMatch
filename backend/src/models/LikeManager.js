/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class LikeManager extends AbstractManager {
  constructor() {
    super({ table: "user_like" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  findLike(user_like) {
    return this.connection.query(
      `select user1_id from  ${this.table} where isliked = ? and user2_id = ?`,
      [user_like.isliked, user_like.user2_id]
    );
  }

  insert(user_like) {
    return this.connection.query(
      `insert into ${this.table} (user1_id, user2_id, isliked, isshown) values (?, ?, ?, ?)`,
      [
        user_like.user1_id,
        user_like.user2_id,
        user_like.isliked,
        user_like.isshown,
      ]
    );
  }
}

module.exports = LikeManager;
