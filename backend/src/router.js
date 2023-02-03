const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

// services d'auth
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

const authControllers = require("./controllers/authControllers");
const matchControllers = require("./controllers/likeControllers");
const userControllers = require("./controllers/userControllers");
const skillControllers = require("./controllers/skillControllers");
const styleControllers = require("./controllers/styleControllers");
const userHasStylesControllers = require("./controllers/userHasStylesControllers");
const userHasSkillsControllers = require("./controllers/userHasSkillsControllers");

const fileControllers = require("./controllers/fileControllers");

// Auth
router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des likes

router.get("/api/likes", verifyToken, matchControllers.browse);
router.get("/api/likes/:isliked/:user2_id", verifyToken, matchControllers.read);
router.post("/api/likes", verifyToken, matchControllers.add);

// Gestion des skills

router.get("/api/skills", verifyToken, skillControllers.browse);
router.get(
  "/api/filter/:skill_id",
  verifyToken,
  userHasSkillsControllers.userFilter
);
router.get(
  "/api/skills/:user_id",
  verifyToken,
  skillControllers.getSkillByUserID
);

router.delete(
  "/api/userhasskills/:skill_id/:user_id",
  verifyToken,
  userHasSkillsControllers.remove
);

router.post("/api/userhasskills", verifyToken, userHasSkillsControllers.add);

// Gestion des styles

router.get("/api/styles", verifyToken, styleControllers.browse);

router.delete(
  "/api/userhasstyles/:style_id/:user_id",
  verifyToken,
  userHasStylesControllers.remove
);

router.post("/api/userhasstyles", verifyToken, userHasStylesControllers.add);

router.get(
  "/api/styles/:user_id",
  verifyToken,
  styleControllers.getStyleByUserID
);

// Gestion des users
router.get("/api/users", verifyToken, userControllers.browse);

router.get("/api/users/:id", verifyToken, userControllers.read);
router.post("/api/users", hashPassword, verifyToken, userControllers.add);
router.put("/api/users/:id", verifyToken, userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des avatars
router.post(
  "/api/avatars",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  userControllers.updateAvatar
);
router.get("/api/avatars/:fileName", fileControllers.sendAvatar);

module.exports = router;
