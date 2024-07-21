const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  utilisateur: { type: Schema.Types.ObjectId, ref: "User", required: true },
  propriete: { type: Schema.Types.ObjectId, required: true },
  dateDeDebut: { type: Date, required: true },
  dateDeFin: { type: Date, required: true },
  statut: {
    type: String,
    enum: ["en attente", "confirmee", "annulee"],
    required: true,
  },
  montantTotal: { type: Number, required: true },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
