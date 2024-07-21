const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    typeDePropriete: { type: String, enum: ['chambreEtudiante', 'hotelTouriste'], required: true },
    propriete: { type: Schema.Types.ObjectId, required: true },
    dateDeCreation: { type: Date, default: Date.now },
    statut: { type: String, enum: ['actif', 'inactif'], required: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post
