"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/Date-range-picker";
import { addDays, format, differenceInDays } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Room() {
  const PRICE_PER_NIGHT = 150;
  const CLEANING_FEE = 50;
  const SERVICE_FEE = 70;
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const numberOfNights =
    date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0;
  const totalNightlyRate = numberOfNights * PRICE_PER_NIGHT;
  const totalBeforeTaxes = totalNightlyRate + CLEANING_FEE + SERVICE_FEE;

  const img =
    "https://img.freepik.com/free-photo/city-water_1417-1903.jpg?w=740&t=st=1721500580~exp=1721501180~hmac=2f8551aefa1426fe477e663a8445311f1f3eb499aefb609749ae107bf781bb7f";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="#"
              className="relative overflow-hidden rounded-lg"
              prefetch={false}
            >
              <img
                src={img}
                alt="Chambre d'hôtel"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2]"
              />
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="#"
                className="relative overflow-hidden rounded-lg"
                prefetch={false}
              >
                <img
                  src={img}
                  alt="Chambre d'hôtel"
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[3/2]"
                />
              </Link>
              <Link
                href="#"
                className="relative overflow-hidden rounded-lg"
                prefetch={false}
              >
                <img
                  src={img}
                  alt="Chambre d'hôtel"
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[3/2]"
                />
              </Link>
              <Link
                href="#"
                className="relative overflow-hidden rounded-lg"
                prefetch={false}
              >
                <img
                  src={img}
                  alt="Chambre d'hôtel"
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[3/2]"
                />
              </Link>
              <Link
                href="#"
                className="relative overflow-hidden rounded-lg"
                prefetch={false}
              >
                <img
                  src={img}
                  alt="Chambre d'hôtel"
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[3/2]"
                />
              </Link>
            </div>
          </div>
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold">
              Chambre cosy avec vue sur la mer
            </h1>
            <p>
              Découvrez notre chambre d'hôtel confortable et chaleureuse,
              idéalement située avec une vue imprenable sur la mer. Profitez de
              nos équipements haut de gamme pour un séjour inoubliable.
            </p>
            <ul>
              <li>
                <BedIcon className="w-4 h-4 mr-2" />
                Lit king size
              </li>
              <li>
                <ShowerHeadIcon className="w-4 h-4 mr-2" />
                Salle de bain privative avec douche à l'italienne
              </li>
              <li>
                <TvIcon className="w-4 h-4 mr-2" />
                Télévision à écran plat
              </li>
              <li>
                <WifiIcon className="w-4 h-4 mr-2" />
                Accès WiFi gratuit
              </li>
              <li>
                <BuildingIcon className="w-4 h-4 mr-2" />
                Terrasse privée avec vue sur la mer
              </li>
              <li>
                <AirVentIcon className="w-4 h-4 mr-2" />
                Climatisation
              </li>
              <li>
                <SaveIcon className="w-4 h-4 mr-2" />
                Coffre-fort
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">$150 / nuit</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <DatePickerWithRange
                      date={date}
                      setDate={setDate}
                      className="w-full"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="h-auto">
                      <SelectValue
                        placeholder={
                          <div className="flex flex-col items-start">
                            <span className="font-semibold uppercase text-[0.65rem]">
                              Voyageurs
                            </span>
                            <span className="font-normal">2 adultes</span>
                          </div>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 adulte</SelectItem>
                      <SelectItem value="2">2 adultes</SelectItem>
                      <SelectItem value="3">2 adultes + 1 enfant</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <div>
                    <Button size="lg" className="w-full h-12">
                      Réserver
                    </Button>
                  </div>
                  <div className="text-sm text-center text-muted-foreground">
                    Vous ne serez pas facturé pour le moment
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                <DollarSignIcon className="w-4 h-4 mr-2" />
                {PRICE_PER_NIGHT} x {numberOfNights} nuits
              </div>
              <div>
                <DollarSignIcon className="w-4 h-4 mr-2" />
                {totalNightlyRate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                <BrushIcon className="w-4 h-4 mr-2" />
                Frais de ménage <span className="text-xs">(unique)</span>
              </div>
              <div>
                <DollarSignIcon className="w-4 h-4 mr-2" />
                {CLEANING_FEE}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                <PercentIcon className="w-4 h-4 mr-2" />
                Frais de service
              </div>
              <div>
                <DollarSignIcon className="w-4 h-4 mr-2" />
                {SERVICE_FEE}
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              <DollarSignIcon className="w-4 h-4 mr-2" />
              Total avant taxes
            </div>
            <div>
              <DollarSignIcon className="w-4 h-4 mr-2" />
              {totalBeforeTaxes}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="rounded-lg w-full h-[400px]" />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="border w-11 h-11">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid">
              <div className="font-semibold">Catherine</div>
              <div className="text-sm text-muted-foreground">
                <StarIcon className="w-4 h-4 mr-2" />
                Superhost depuis 2015
              </div>
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              Bonjour, je suis Catherine, votre hôte pour ce séjour. J'ai hâte
              de vous accueillir dans notre chambre d'hôtel et de vous faire
              découvrir notre magnifique région. N'hésitez pas à me contacter si
              vous avez la moindre question, je serai ravi de vous aider à
              préparer votre séjour.
            </p>
          </div>
          <Button variant="outline" className="justify-self-start">
            <MailIcon className="w-4 h-4 mr-2" />
            Contacter l'hôte
          </Button>
        </div>
      </div>
    </div>
  );
}

function AirVentIcon(props) {
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
      <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 8h12" />
      <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" />
      <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
    </svg>
  );
}

function BedIcon(props) {
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
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function BrushIcon(props) {
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
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
}

function BuildingIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

function PercentIcon(props) {
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
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function SaveIcon(props) {
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
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}

function ShowerHeadIcon(props) {
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
      <path d="m4 4 2.5 2.5" />
      <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
      <path d="M15 5 5 15" />
      <path d="M14 17v.01" />
      <path d="M10 16v.01" />
      <path d="M13 13v.01" />
      <path d="M16 10v.01" />
      <path d="M11 20v.01" />
      <path d="M17 14v.01" />
      <path d="M20 11v.01" />
    </svg>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TvIcon(props) {
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
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

function WifiIcon(props) {
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
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
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
