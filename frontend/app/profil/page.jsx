import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Profil() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <div className="text-sm text-primary-foreground/80">
                john@example.com
              </div>
              <div className="text-sm text-primary-foreground/80">
                +1 (555) 123-4567
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
          >
            <SettingsIcon className="h-6 w-6" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>
      <section className="bg-background p-6 border-b border-muted">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mes réservations</h3>
          <Link
            href="#"
            className="text-primary hover:underline"
            prefetch={false}
          >
            Voir tout
          </Link>
        </div>
        <div className="grid gap-4 mt-4">
          <Card>
            <CardContent className="grid grid-cols-[1fr_auto] gap-4">
              <div>
                <h4 className="font-medium">Hôtel Ritz-Carlton</h4>
                <div className="text-sm text-muted-foreground">
                  Du 15 juin au 20 juin 2023
                </div>
                <div className="text-sm text-muted-foreground">
                  Chambre Deluxe
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-lg font-semibold">$1,200</div>
                <Button variant="outline" size="sm">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid grid-cols-[1fr_auto] gap-4">
              <div>
                <h4 className="font-medium">Hôtel Fairmont</h4>
                <div className="text-sm text-muted-foreground">
                  Du 1er août au 5 août 2023
                </div>
                <div className="text-sm text-muted-foreground">
                  Chambre Supérieure
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-lg font-semibold">$800</div>
                <Button variant="outline" size="sm">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="bg-background p-6 border-b border-muted">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mes préférences</h3>
          <Link
            href="#"
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
        <Button variant="destructive" className="w-full">
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
