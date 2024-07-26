const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertyType: { type: String, enum: ['hotel', 'appartement'], required: true },
  country: { value: { type: String, required: true }, label: { type: String, required: true } },
  address: { type: String, required: true },
  propertyCategory: { type: String, enum: ['etudiants', 'touristes'], required: true },
  monthlyPrice: { type: Number, required: function() { return this.propertyCategory === 'etudiants'; } },
  nightlyPrice: { type: Number, required: function() { return this.propertyCategory === 'touristes'; } },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  amenities: {
    kingSizeBed: { type: Boolean, default: false },
    privateBathroom: { type: Boolean, default: false },
    flatScreenTv: { type: Boolean, default: false },
    freeWifi: { type: Boolean, default: false },
    privateTerrace: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    safe: { type: Boolean, default: false }
  },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  houseRules: { type: String, required: true },
  cancellationPolicy: { type: String, required: true },
  uploadedImageIds: [{ type: String, required: true }]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
