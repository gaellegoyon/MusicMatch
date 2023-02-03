/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.user_like
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const user_like = req.body;

  user_like.isliked = req.params;
  user_like.user2_id = req.params;

  models.user_like
    .findLike(user_like.isliked, user_like.user2_id)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user_like = req.body;

  // on verifie les données

  models.user_like
    .insert(user_like)
    .then(([result]) => {
      res.location(`/api/likes/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  add,
};
