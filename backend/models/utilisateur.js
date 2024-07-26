const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // phone: { type: String, required: true },
  profilEtudiant: {
    universite: String,
    programmeDetudes: String,
  },
  profilTouriste: {
    informationsSupplementaires: String,
  },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],

});

const User = mongoose.model("User", userSchema);

// role: {
//   type: String,
//   enum: ["etudiant", "touriste", "administrateur"],
//   required: true,
// },

module.exports = User;
