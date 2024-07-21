const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chambreEtudianteSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  proprietaire: { type: Schema.Types.ObjectId, ref: "User", required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  adresse: { type: String, required: true },
  prixParNuit: { type: Number, required: true },
  photos: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  disponibilite: { type: Boolean, required: true },
});

const ChambreEtudiante = mongoose.model(
  "ChambreEtudiante",
  chambreEtudianteSchema
);

const hotelTouristeSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  proprietaire: { type: Schema.Types.ObjectId, ref: "User", required: true },
  nomHotel: { type: String, required: true },
  description: { type: String, required: true },
  adresse: { type: String, required: true },
  prixParNuit: { type: Number, required: true },
  photos: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  disponibilite: { type: Boolean, required: true },
});

const HotelTouriste = mongoose.model("HotelTouriste", hotelTouristeSchema);

module.exports = { ChambreEtudiante, HotelTouriste };
