const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  utilisateur: { type: Schema.Types.ObjectId, ref: "User", required: true },
  propriete: { type: Schema.Types.ObjectId, ref: "Property", required: true }, // Ajout de la référence à la propriété
  categorie: { type: String, enum: ["etudiants", "touristes"], required: true }, // Ajout de la catégorie
  dateDeDebut: { type: Date, required: true },
  dateDeFin: { type: Date, required: true },
  nombreDeNuits: { type: Number, required: true }, // Ajout du nombre de nuits
  nombreDeMois: { type: Number, required: true }, // Ajout du nombre de mois
  montantTotal: { type: Number, required: true }, // Coût total
  montantMensuelTotal: { type: Number, required: true }, // Coût mensuel total
  statut: {
    type: String,
    enum: ["en attente", "confirmee"],
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;