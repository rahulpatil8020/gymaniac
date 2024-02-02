const express = require("express");
const { login, signup } = require("../controllers/authController");
const {
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getUser);
router.route("/:id").get(getUserByUsername);
router.route("/:id").patch(updateUser);
router.route("/").delete(deleteUser);

module.exports = router;
