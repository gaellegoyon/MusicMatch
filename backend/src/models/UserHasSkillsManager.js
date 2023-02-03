/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserHasSkillsManager extends AbstractManager {
  constructor() {
    super({ table: "user_has_skills" });
  }

  del(user_has_skills) {
    return this.connection.query(
      `delete from ${this.table} where skill_id = ? and user_id = ?`,
      [user_has_skills.skill_id, user_has_skills.user_id]
    );
  }

  find(user_has_skills) {
    return this.connection.query(
      `select * from ${this.table} inner join user on user.id = user_has_skills.user_id where skill_id = ?`,
      [user_has_skills.skill_id]
    );
  }

  insert(user_has_skills) {
    return this.connection.query(
      `insert into ${this.table} (skill_id, user_id) values (?, ?)`,
      [user_has_skills.skill_id, user_has_skills.user_id]
    );
  }
}

module.exports = UserHasSkillsManager;
