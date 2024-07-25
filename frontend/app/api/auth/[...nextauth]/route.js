import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const fullName = user.name.split(" ");
      const name = fullName[0];
      const lastname = fullName[1];
      const email = user.email;
      const password = " "; 
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastname,
            email,
            password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.log("API error message:", errorData.message);
          return false; // Empêche l'utilisateur de se connecter si l'inscription échoue
        }
        const data = await res.json();
        console.log(data);
        return true; // Permet la connexion
      } catch (error) {
        console.log("Error while trying to register", error);
        return false; // Empêche l'utilisateur de se connecter si une erreur se produit
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirige l'utilisateur vers "/recherche" après une connexion réussie
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/recherche`;
      }
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
