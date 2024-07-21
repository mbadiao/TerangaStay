import mongoose from "mongoose";

export const connectDataBase = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connexion etablie avec mongodb");
  } catch (error) {
    console.log("erreur l'ors connexion  avec mongodb");
  }
};
