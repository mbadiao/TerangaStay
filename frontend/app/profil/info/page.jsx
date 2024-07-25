import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InfoPerso() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-muted/20 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">Mbaye Diao</h2>
            <p className="text-muted-foreground">
              Prénom d'usage: Information non fournie
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Modifier le profil
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Informations personnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Nom officiel
              </Label>
              <Input id="name" defaultValue="Mbaye Diao" />
            </div>
            <div className="grid gap-1">
              <Label
                htmlFor="preferred-name"
                className="flex items-center gap-2"
              >
                <UserIcon className="h-4 w-4" />
                Prénom d'usage
              </Label>
              <Input
                id="preferred-name"
                placeholder="Ajouter un prénom d'usage"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email" className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                Adresse e-mail
              </Label>
              <Input id="email" type="email" defaultValue="d***2@gmail.com" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                Numéro de téléphone
              </Label>
              <Input id="phone" placeholder="Ajouter un numéro de téléphone" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="id" className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                Pièce d'identité officielle
              </Label>
              <Input id="id" placeholder="Ajouter une pièce d'identité" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                Adresse
              </Label>
              <Input id="address" placeholder="Ajouter une adresse" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="emergency" className="flex items-center gap-2">
                <PhoneCallIcon className="h-4 w-4" />
                Numéros d'urgence
              </Label>
              <Input
                id="emergency"
                placeholder="Ajouter des numéros d'urgence"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-muted-foreground">
            Certaines informations sont masquées pour protéger votre identité.
            Vous pouvez modifier vos coordonnées et informations personnelles à
            tout moment.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-6">
        <Button variant="outline" className="flex items-center gap-2">
          <XIcon className="h-4 w-4" />
          Annuler
        </Button>
        <Button className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </CardFooter>
    </Card>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function PhoneCallIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
