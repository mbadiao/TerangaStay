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
  const { email } = await req.json();

  // Trouvez l'utilisateur par email
  const user = await User.findOne({ email });
  if (user) {
    // Créez un jeton JWT
    const token = jwt.sign(
      { userId: user._id, admin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Sérialisez le cookie
    const serializedCookie = cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 3600, // 1 heure
      path: "/",
    });

    // Créez la réponse et définissez le cookie
    const response = NextResponse.json(
      { data: { user }, message: "Login successful" },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", serializedCookie);

    return response;
  }

  // Si les informations de connexion sont incorrectes
  return NextResponse.json(
    { message: "Invalid email or password" },
    { status: 401 }
  );
}
