"use client";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserReservations = async () => {
      const userid = localStorage.getItem("user");
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE + `reservation/user/${userid}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          toast({
            description: "Erreur lors de la récupération des réservations",
          });
        }
      } catch (error) {
        toast({
          description: `Error fetching user reservations: ${error}`,
        });
      }
    };

    fetchUserReservations();
  }, [toast]);

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (propertyTypeFilter === "all" ||
        reservation.propriete.propertyType === propertyTypeFilter) &&
      (statusFilter === "all" || reservation.statut === statusFilter)
    );
  });

  return (
    <div className="container mx-auto py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CalendarIcon className="mr-2 h-6 w-6" />
        Réservations d&apos;Hôtel
      </h1>

      <div className="mb-6 flex space-x-4">
        <div>
          <label htmlFor="propertyTypeFilter" className="block mb-2">
            Filtrer par type de propriété
          </label>
          <select
            id="propertyTypeFilter"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
            className="border bg-primary text-white border-primary rounded-md p-2"
          >
            <option value="all">Tous</option>
            <option value="appartement">Appartement</option>
            <option value="hotel">Hôtel</option>
          </select>
        </div>

        <div>
          <label htmlFor="statusFilter" className="block mb-2">
            Filtrer par statut
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border bg-primary text-white border-gray-300 rounded-md p-2"
          >
            <option value="all">Tous</option>
            <option value="en attente">En attente</option>
            <option value="confirmee">Confirmée</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left flex items-center">
                <PackageIcon className="mr-2 h-4 w-4" />
                Type
              </th>
              <th className="px-4 py-2 text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Arrivée
              </th>
              <th className="px-4 py-2 text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Départ
              </th>
              <th className="px-4 py-2 text-left">XOF Prix Total</th>
              <th className="px-4 py-2 text-left">
                <CircleCheckIcon className="mr-2 h-4 w-4" />
                Statut
              </th>
              <th className="px-4 py-2 text-left">
                <FilePenIcon className="mr-2 h-4 w-4" />
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr className="border-b" key={reservation._id}>
                <td className="px-4 py-2 flex items-center">
                  <PackageIcon className="mr-2 h-4 w-4" />
                  {reservation.propriete.propertyType}
                </td>
                <td className="px-4 py-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(reservation.dateDeDebut).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(reservation.dateDeFin).toLocaleDateString()}
                </td>
                {reservation?.propriete.propertyType === "appartement" ? (
                  <td className="px-4 py-2">
                    {reservation?.montantMensuelTotal} XOF
                  </td>
                ) : (
                  <td className="px-4 py-2">{reservation?.montantTotal} XOF</td>
                )}
                <td className="px-4 py-2">
                  <span
                    className={`flex items-center justify-center px-2 py-1 rounded-full ${
                      reservation.statut === "confirmee"
                        ? "bg-green-200 text-green-800"
                        : reservation.statut === "en attente"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {reservation.statut === "confirmee" && (
                      <CircleCheckIcon className="mr-2 h-4 w-4" />
                    )}
                    {reservation.statut === "en attente" && (
                      <CircleAlertIcon className="mr-2 h-4 w-4" />
                    )}
                    {reservation.statut}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link href={`/checkout/${reservation._id}`}>
                      <Button variant="outline" size="sm">
                        <FilePenIcon className="mr-2 h-4 w-4" />
                        Paiement
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircleAlertIcon(props) {
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
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleXIcon(props) {
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
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
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

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
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
