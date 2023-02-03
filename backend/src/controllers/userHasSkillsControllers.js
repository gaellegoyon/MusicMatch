/* eslint-disable camelcase */
const models = require("../models");

const remove = (req, res) => {
  const skill_id = req.params;
  const user_id = req.params;

  models.user_has_skills
    .del(skill_id, user_id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user_has_skills = req.body;

  // on verifie les données

  models.user_has_skills
    .insert(user_has_skills)
    .then(([result]) => {
      res.location(`/api/userhasskills/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const userFilter = (req, res) => {
  const user_has_skills = req.body;

  user_has_skills.skill_id = req.params;

  models.user_has_skills
    .find(user_has_skills.skill_id)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  remove,
  add,
  userFilter,
};
