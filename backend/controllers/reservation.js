const asyncHandler = require("express-async-handler");
const Reservation = require("../models/reservations");

// Créer une nouvelle réservation
const createReservation = asyncHandler(async (req, res) => {
  const {
    utilisateur,
    propriete,
    categorie,
    dateDeDebut,
    dateDeFin,
    nombreDeNuits,
    nombreDeMois,
    montantTotal,
    montantMensuelTotal,
    statut
  } = req.body;

  const reservation = new Reservation({
    utilisateur,
    propriete,
    categorie,
    dateDeDebut,
    dateDeFin,
    nombreDeNuits,
    nombreDeMois,
    montantTotal,
    montantMensuelTotal,
    statut
  });

  const createdReservation = await reservation.save();
  res.status(201).json(createdReservation);
});

// Obtenir toutes les réservations
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().populate('utilisateur propriete');
  res.json(reservations);
});

// Obtenir une réservation par ID
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate('utilisateur propriete');

  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404);
    throw new Error('Réservation non trouvée');
  }
});

// Obtenir toutes les réservations par utilisateur
const getReservationsByUser = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ utilisateur: req.params.id }).populate('utilisateur propriete');
  if (reservations) {
    res.json(reservations);
  } else {
    res.status(404);
    throw new Error('Réservations non trouvées');
  }
});

// Mettre à jour une réservation
const updateReservation = asyncHandler(async (req, res) => {
  const {
    utilisateur,
    propriete,
    categorie,
    dateDeDebut,
    dateDeFin,
    nombreDeNuits,
    nombreDeMois,
    montantTotal,
    montantMensuelTotal,
    statut
  } = req.body;

  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    reservation.utilisateur = utilisateur || reservation.utilisateur;
    reservation.propriete = propriete || reservation.propriete;
    reservation.categorie = categorie || reservation.categorie;
    reservation.dateDeDebut = dateDeDebut || reservation.dateDeDebut;
    reservation.dateDeFin = dateDeFin || reservation.dateDeFin;
    reservation.nombreDeNuits = nombreDeNuits || reservation.nombreDeNuits;
    reservation.nombreDeMois = nombreDeMois || reservation.nombreDeMois;
    reservation.montantTotal = montantTotal || reservation.montantTotal;
    reservation.montantMensuelTotal = montantMensuelTotal || reservation.montantMensuelTotal;
    reservation.statut = statut || reservation.statut;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error('Réservation non trouvée');
  }
});

// Supprimer une réservation
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (reservation) {
    res.json({ message: 'Réservation supprimée' });
  } else {
    res.status(404);
    throw new Error('Réservation non trouvée');
  }
});

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUser
};
