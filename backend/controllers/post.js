const asyncHandler = require("express-async-handler");
const Property = require('../models/posts'); // Assurez-vous que le chemin est correct

const postProperty = asyncHandler(async (req, res) => {
  const data = req.body;
  try {
    const property = new Property(data);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id).populate('user');
    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { postProperty, getPropertyById, getAllProperties };
