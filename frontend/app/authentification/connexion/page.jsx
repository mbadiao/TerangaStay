"use client";
import { signIn } from "next-auth/react";
const Connexion = () => {
  return (
    <>
      <button onClick={() => signIn("google")}>connexion</button>
    </>
  );
};

export default Connexion;
