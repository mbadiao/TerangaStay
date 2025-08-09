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
      if (!userid) {
        toast({ description: "Utilisateur non connecté." });
        return;
      }
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE + `reservation/user/${userid}`,
          {
            credentials: "include",
          },
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

  const filteredReservations = reservations?.filter((reservation) => {
    return (
      (propertyTypeFilter === "all" ||
        reservation?.propriete?.propertyType === propertyTypeFilter) &&
      (statusFilter === "all" || reservation?.statut === statusFilter)
    );
  });

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center text-gray-900">
          <CalendarIcon className="mr-3 h-8 w-8 text-primary" />
          Mes Réservations
        </h1>
        <p className="text-gray-600">
          Gérez vos réservations d&apos;hébergements
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Filtres</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="propertyTypeFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Type de propriété
            </label>
            <select
              id="propertyTypeFilter"
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="appartement">Appartement</option>
              <option value="hotel">Hôtel</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="statusFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Statut de la réservation
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="en attente">En attente</option>
              <option value="confirmee">Confirmée</option>
            </select>
          </div>
        </div>
      </div>

      {filteredReservations?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <CalendarIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune réservation trouvée
          </h3>
          <p className="text-gray-600 mb-6">
            {reservations?.length === 0
              ? "Vous n'avez pas encore effectué de réservation."
              : "Aucune réservation ne correspond à vos critères de filtre."}
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              Découvrir nos hébergements
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <PackageIcon className="mr-2 h-5 w-5 text-gray-500" />
                      Type
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                      Arrivée
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                      Départ
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Prix Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <CircleCheckIcon className="mr-2 h-5 w-5 text-gray-500" />
                      Statut
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <FilePenIcon className="mr-2 h-5 w-5 text-gray-500" />
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReservations?.map((reservation) => (
                  <tr
                    key={reservation._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PackageIcon className="mr-3 h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {reservation?.propriete?.propertyType || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(reservation?.dateDeDebut).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(reservation?.dateDeFin).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {reservation?.propriete?.propertyType === "appartement"
                          ? `${reservation?.montantMensuelTotal || "0"} XOF`
                          : `${reservation?.montantTotal || "0"} XOF`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          reservation?.statut === "confirmee"
                            ? "bg-green-100 text-green-800"
                            : reservation?.statut === "en attente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reservation?.statut === "confirmee" && (
                          <CircleCheckIcon className="mr-1 h-3 w-3" />
                        )}
                        {reservation?.statut === "en attente" && (
                          <CircleAlertIcon className="mr-1 h-3 w-3" />
                        )}
                        {reservation?.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/checkout/${reservation?._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-white transition-colors"
                        >
                          <FilePenIcon className="mr-2 h-4 w-4" />
                          Paiement
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
