/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class SkillManager extends AbstractManager {
  constructor() {
    super({ table: "skill" });
  }

  insert(skill) {
    return this.connection.query(
      `INSERT INTO ${this.table} (skillname)
    VALUES(?)`,
      [skill.skillname]
    );
  }

  findById(skill) {
    return this.connection.query(
      `select * from  ${this.table} inner join user_has_skills on skill.id = user_has_skills.skill_id where user_id = ?`,
      [skill.user_id]
    );
  }

  update(skill) {
    return this.connection.query(
      `UPDATE ${this.table} SET skillname = ? WHERE id = ? `,
      [skill.skillname, skill.id]
    );
  }
}

module.exports = SkillManager;
