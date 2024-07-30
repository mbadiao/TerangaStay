const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationDetailsSchema = new Schema({
  type: { type: String, required: true },
  nombreDeMois: { type: Number },
  montantMensuelTotal: { type: Number },
  nombreDeNuits: { type: Number },
  montantTotal: { type: Number }
}, { _id: false });

const checkoutSchema = new Schema({
  userid: {type: String, required: true},
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiration: { type: String, required: true },
  cvv: { type: String, required: true },
  reservationDetails: { type: reservationDetailsSchema, required: true }
}, { timestamps: true });

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
