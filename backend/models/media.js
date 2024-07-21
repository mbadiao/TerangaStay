const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    propriete: { type: Schema.Types.ObjectId, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['photo', 'video'], required: true }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media