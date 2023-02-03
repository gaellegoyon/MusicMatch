/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserHasStylesManager extends AbstractManager {
  constructor() {
    super({ table: "user_has_styles" });
  }

  del(user_has_styles) {
    return this.connection.query(
      `delete from ${this.table} where style_id = ? and user_id = ?`,
      [user_has_styles.style_id, user_has_styles.user_id]
    );
  }

  insert(user_has_styles) {
    return this.connection.query(
      `insert into ${this.table} (style_id, user_id) values (?, ?)`,
      [user_has_styles.style_id, user_has_styles.user_id]
    );
  }
}

module.exports = UserHasStylesManager;
