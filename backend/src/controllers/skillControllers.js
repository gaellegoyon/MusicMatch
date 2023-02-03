/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.skill
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getSkillByUserID = (req, res) => {
  const skill = req.body;

  skill.user_id = req.params;

  models.skill
    .findById(skill.user_id)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const skill = req.body;

  models.skill
    .insert(skill)
    .then(([result]) => {
      res.location(`/api/skill/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const skill = req.body;
  skill.id = req.params.id;

  models.skill
    .update(skill)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.skill
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  getSkillByUserID,
  add,
  edit,
  destroy,
};
