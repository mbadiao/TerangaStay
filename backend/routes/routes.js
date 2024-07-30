const {
  login,
  register,
  logout,
  profile,
  updateUser,
} = require("../controllers/auth");
const {
  postProperty,
  getAllProperties,
  getPropertyById,
} = require("../controllers/post");
const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUser,
} = require("../controllers/reservation");

const {
  createCheckout,
  getAllCheckouts,
  deleteCheckoutById,
} = require("../controllers/checkout");

// Route pour créer un nouveau Checkout
router.post("/checkout", createCheckout);

// Route pour récupérer tous les Checkouts
router.get("/checkouts/:id", getAllCheckouts);

// Route pour supprimer un Checkout par ID
router.delete("/checkout/:id", deleteCheckoutById);

// Route pour créer une nouvelle réservation
router.post("/reservation", createReservation);

// Route pour obtenir toutes les réservations
router.get("/reservation", getReservations);

// Route pour obtenir une réservation par ID getReservationsByUser
router.get("/reservation/:id", getReservationById);

router.get("/reservation/user/:id", getReservationsByUser);

// Route pour mettre à jour une réservation
router.put("/reservation/:id", updateReservation);

// Route pour supprimer une réservation
router.delete("/reservation/:id", deleteReservation);

router.post("/user/update", updateUser);

router.get("/properties", getAllProperties);
router.get("/property/:id", getPropertyById);
router.post("/inscription", register);
router.post("/property", postProperty);
router.post("/connexion", login);
router.post("/logout", logout);
router.get("/profil", profile);
module.exports = router;
