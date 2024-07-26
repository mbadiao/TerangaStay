const {
  login,
  register,
  logout,
  profile,
} = require("../controllers/auth");
const { postProperty,  getAllProperties, getPropertyById  } = require("../controllers/post");
const express = require("express");
const router = express.Router();

router.get("/properties", getAllProperties);
router.get("/property/:id", getPropertyById);
router.post("/inscription", register);
router.post("/property", postProperty);
router.post("/connexion", login);
// router.post("/logout", logout);
router.get("/profil", profile);
module.exports = router;
