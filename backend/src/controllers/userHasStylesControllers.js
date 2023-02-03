/* eslint-disable camelcase */
const models = require("../models");

const remove = (req, res) => {
  const style_id = req.params;
  const user_id = req.params;

  models.user_has_styles
    .del(style_id, user_id)
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
  const user_has_styles = req.body;

  // on verifie les données

  models.user_has_styles
    .insert(user_has_styles)
    .then(([result]) => {
      res.location(`/api/userhasstyles/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  remove,
  add,
};
