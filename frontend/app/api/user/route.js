import { connectDataBase } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  // Connectez-vous à la base de données
  await connectDataBase();

  // Récupérez les données de la requête
  const { name, lastname, email, password } = await req.json();

  // Trouvez l'utilisateur par email
  let user = await User.findOne({ email });

  if (!user) {
    // Si l'utilisateur n'existe pas, créez-le
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();
  }

  // Créez un jeton JWT
  const token = jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET,
  );
  

  // Sérialisez le cookie
  const serializedCookie = cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
  });

  // Créez la réponse et définissez le cookie
  const response = NextResponse.json(
    { data: { user }, message: "Login successful" },
    { status: 200 }
  );
  response.headers.set("Set-Cookie", serializedCookie);

  return response;
}
