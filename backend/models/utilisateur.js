const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  numeroDeTelephone: { type: String, required: true },
  profilEtudiant: {
    universite: String,
    programmeDetudes: String,
  },
  profilTouriste: {
    informationsSupplementaires: String,
  },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  role: {
    type: String,
    enum: ["etudiant", "touriste", "administrateur"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
