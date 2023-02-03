/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class StyleManager extends AbstractManager {
  constructor() {
    super({ table: "style" });
  }

  insert(style) {
    return this.connection.query(
      `INSERT INTO ${this.table} (stylename)
    VALUES(?)`,
      [style.stylename]
    );
  }

  update(style) {
    return this.connection.query(
      `UPDATE ${this.table} SET stylename = ? WHERE id = ? `,
      [style.stylename, style.id]
    );
  }

  findById(style) {
    return this.connection.query(
      `select * from  ${this.table} inner join user_has_styles on style.id = user_has_styles.style_id where user_id = ?`,
      [style.user_id]
    );
  }

  del(user_id, style_id) {
    return this.connection.query(
      `delete from user_has_styles where user_id = ? and style_id = ?`,
      [user_id, style_id]
    );
  }
}

module.exports = StyleManager;
