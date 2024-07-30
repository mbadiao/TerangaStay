const Checkout = require('../models/checkout');
const Reservation = require("../models/reservations");
const mongoose = require('mongoose');

// Handler pour créer un nouveau Checkout et mettre à jour le statut de la réservation
const createCheckout = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const checkoutData = req.body;
  
      // Créer un nouveau Checkout
      const newCheckout = new Checkout(checkoutData);
      await newCheckout.save({ session });
  
      // Mettre à jour le statut de la réservation en "confirmée"
      const reservationId = checkoutData.reservationDetails._id; // Assurez-vous que l'ID de la réservation est inclus dans checkoutData
      await Reservation.findByIdAndUpdate(
        reservationId,
        { statut: 'confirmee' },
        { session, new: true }
      );
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json(newCheckout);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error creating checkout:', error);
      res.status(500).json({ error: 'Erreur lors de la création du checkout' });
    }
  };

const deleteCheckoutById = async (req, res) => {
    try {
      const checkoutId = req.params.id;
      const deletedCheckout = await Checkout.find({ utilisateur: req.params.id });
      if (!deletedCheckout) {
        return res.status(404).json({ error: 'Checkout non trouvé' });
      }
      res.status(200).json({ message: 'Checkout supprimé avec succès' });
    } catch (error) {
      console.error('Error deleting checkout:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du checkout' });
    }
  };
  
  const getAllCheckouts = async (req, res) => {
    try {
      const checkouts = await Checkout.find({ userid: req.params.id });
      res.status(200).json(checkouts);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des checkouts' });
    }
  };
  

module.exports = { createCheckout, deleteCheckoutById ,getAllCheckouts };
