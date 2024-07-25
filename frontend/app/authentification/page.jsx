"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
const Inscription = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [password, setpassword] = useState();
  const handleregister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE + "inscription",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, lastname, email, phone, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({
          title:"Login Succes",
          description:'your are succesfully logged'
        })
        router.push("/");
      } else {
        toast({
          title:"Login Error",
          description:`${data.message}`
        })
      }
    } catch (e) {
      toast({
        title:"Login Error",
        description:`${e.message}`
      })
      retrun
    }
  };

  const img =
    "https://img.freepik.com/free-photo/children-desk-interior-design_23-2148569194.jpg?t=st=1721589106~exp=1721592706~hmac=a228662c2158aace97460bbf70d835e93854fc81696a5f42f04fcffb0c981b37&w=740";
  return (
    <>
      <div className="flex items-center justify-evenly min-h-screen bg-background">
        <div>
          <Image
            className="mb-4 size-full rounded-lg object-contain lg:block md:block hidden"
            src={img}
            width={350}
            height={500}
            priority
            alt={`Image register`}
          />
        </div>
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
              <h2 className="text-xl font-bold mb-4 text-center">S'inscrire</h2>
              <form className="space-y-4" onSubmit={handleregister}>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Prénom</Label>
                    <Input
                      id="name"
                      placeholder="Entrez votre prénom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Nom</Label>
                    <Input
                      id="name"
                      placeholder="Entrez votre nom"
                      value={lastname}
                      onChange={(e) => setlastname(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Entrez votre email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div>
                    <PhoneInput
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter voter numéro de telephone"
                      value={phone}
                      onChange={setphone}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>
              </form>
              <div className="flex gap-3 mt-4 flex-wrap">
                <p>vous avez deja un compte ?</p>
                <Link
                  href="/authentification/connexion"
                  className="text-primary"
                  prefetch={false}
                >
                  connecter vous .
                </Link>
              </div>
            </div>
          </div>
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

export default Inscription;
