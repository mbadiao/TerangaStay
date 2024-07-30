const asyncHandler = require("express-async-handler");
const User = require("../models/utilisateur");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 3600000,
      })
      .json({ data: { user }, message: "Login successful" });
  }
  return res.status(401).json({ message: "Invalid email or password" });
});

const register = asyncHandler(async (req, res) => {
  const { name, lastname, email, phone, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastname,
      email,
      phone,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 3600000,
      })
      .json({ data: { user }, message: "Register successful." });
  } catch (error) {
    res.status(401).json({ message: "Error while trying to register." });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "").json({ message: "Logout successful" });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, lastname, phone, badge, bio } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.phone = phone || user.phone;
    user.badge = badge || user.badge;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({ data: user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

const profile = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) return res.json(err);
    const user = await User.findById(info.id);
    res.json(user);
  });
};

module.exports = { login, logout, register, profile, updateUser };
