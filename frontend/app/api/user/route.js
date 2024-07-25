import { connectDataBase } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const data = await req.json();
  const { name, lastname, email, password } = data;

  await connectDataBase();

  // Vérifiez si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const user = await User.create({ name, lastname, email, password });

  // Créez un JWT
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1w", // 1 semaine
  });

  // Sérialisez le cookie
  const serializedCookie = cookie.serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    sameSite: "strict",
    path: "/",
  });

  // Créez la réponse et définissez le cookie
  const response = NextResponse.json(
    { message: "User Registered" },
    { status: 201 }
  );
  console.log(serializedCookie);
  response.headers.set("Set-Cookie", serializedCookie);

  return response;
}
