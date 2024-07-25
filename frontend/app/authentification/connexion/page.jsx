"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Connexion = () => {
  const { toast } = useToast();
  const router = useRouter();
  const img =
    "https://img.freepik.com/free-photo/umbrella-pool-chair_1203-6638.jpg?t=st=1721587932~exp=1721591532~hmac=3333edfb1b6f0d60e593de9d997ecb2b8163fbf4edfa903134056c85b47daaec&w=740";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      toast({
        title: "Connexion réussie",
        description: "Vous êtes connecté avec succès.",
      });
      router.push("/");
    } else {
      toast({
        title: "Erreur de connexion",
        description: result.error || "Une erreur est survenue.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-evenly min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center mb-2">
              <MountainIcon className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">CaZa</h1>
            </div>
            <p className="text-muted-foreground">
              Découvrez les meilleures expériences de votre ville.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-1 md:gap-12">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Se connecter
              </h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
                <div className="text-center text-muted-foreground mt-4">
                  <Link
                    href="/authentification"
                    className="underline"
                    prefetch={false}
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </form>
              <div className="flex gap-3 mt-4 flex-wrap">
                <p>vous n'avez pas de compte ?</p>
                <Link
                  href="/authentification"
                  className="text-primary"
                  prefetch={false}
                >
                  inscrivez vous .
                </Link>
              </div>
              <Button
                className="mt-5 block mx-auto"
                onClick={() => signIn("google")}
              >
                Connexion avec Google
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="mb-4 size-full rounded-lg object-contain lg:block md:block hidden"
            src={img}
            width={300}
            height={500}
            priority
            alt="Image register"
          />
        </div>
      </div>
    </>
  );
};

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Connexion;
