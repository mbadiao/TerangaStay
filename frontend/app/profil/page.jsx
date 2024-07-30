"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Profil() {
  const [checkouts, setcheckout] = useState([]);
  const router = useRouter();
  const user = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const logout = async () => {
    try {
      localStorage.removeItem("user");

      const response = await fetch(process.env.NEXT_PUBLIC_BASE + "logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
    setProfile(null);
    router.push("/");
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    const fetchUserCheckout = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE +
            "checkouts/" +
            localStorage.getItem("user"),
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setcheckout(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
    fetchUserCheckout();
  }, [setProfile, setcheckout]);
  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen mt-10">
      <header className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="border w-11 h-11">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-primary">
                {user?.name?.charAt(0) + user?.lastname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                {user?.name} {user?.lastname}
              </h2>
              <div className="text-sm text-primary-foreground/80">
                {user?.email}
              </div>
              <div className="text-sm text-primary-foreground/80">
                {user?.phone}
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="bg-background p-6 border-b border-muted">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mes Payments</h3>
        </div>
        <div className="grid gap-4 mt-4">
          {checkouts.length > 0 ? (
            checkouts.map((checkout) => (
              <Card className="py-4">
                <CardContent className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <h4 className="font-medium">
                      {checkout?.reservationDetails.type}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {checkout?.address}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {checkout?.createdAt}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-lg font-semibold">
                      XOF{" "}
                      {checkout?.reservationDetails.montantTotal ||
                        checkout?.reservationDetails.montantMensuelTotal}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center">
              Vous n&apos;avez pas encore de reservation
            </div>
          )}
        </div>
      </section>
      <section className="bg-background p-6 border-b border-muted">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mes préférences</h3>
          <Link
            href="profil/info"
            className="text-primary hover:underline"
            prefetch={false}
          >
            Modifier
          </Link>
        </div>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <UserIcon className="h-6 w-6 text-muted-foreground" />
            <div>
              <div className="font-medium">Informations personnelles</div>
              <div className="text-sm text-muted-foreground">
                Nom, email, numéro de téléphone
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <BellIcon className="h-6 w-6 text-muted-foreground" />
            <div>
              <div className="font-medium">Paramètres de notification</div>
              <div className="text-sm text-muted-foreground">
                Recevoir des notifications pour les réservations, les offres
                spéciales, etc.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <LockIcon className="h-6 w-6 text-muted-foreground" />
            <div>
              <div className="font-medium">Sécurité du compte</div>
              <div className="text-sm text-muted-foreground">
                Changer le mot de passe, activer l'authentification à deux
                facteurs
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-background p-6 rounded-b-lg">
        <Button variant="destructive" onClick={logout} className="w-full">
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function LockIcon(props) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
