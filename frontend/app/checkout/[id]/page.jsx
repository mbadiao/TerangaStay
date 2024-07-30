"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

const Checkout = () => {
  const router = useRouter();
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const users = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfile(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE}/reservation/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok)
          throw new Error("Échec de la récupération des réservations");
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réservations :",
          error
        );
      }
    };

    fetchUserProfile();
    fetchReservations();
  }, [setProfile]);

  const validateForm = () => {
    const newErrors = {};
    if (!address) newErrors.address = "L'adresse est requise";
    if (!cardNumber) newErrors.cardNumber = "Le numéro de carte est requis";
    if (!expiration) newErrors.expiration = "La date d'expiration est requise";
    if (!cvv) newErrors.cvv = "Le CVV est requis";
    if (cardNumber && !/^\d{16}$/.test(cardNumber))
      newErrors.cardNumber =
        "Le numéro de carte doit être composé de 16 chiffres";
    if (cvv && !/^\d{3}$/.test(cvv))
      newErrors.cvv = "Le CVV doit être composé de 3 chiffres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        userid: users._id,
        name: users?.name || "",
        lastname: users?.lastname || "",
        email: users?.email || "",
        address,
        cardNumber,
        expiration,
        cvv,
        reservationDetails:
          reservations?.categorie === "etudiants"
            ? {
                _id: id,
                type: "etudiants",
                nombreDeMois: reservations?.nombreDeMois || "",
                montantMensuelTotal: reservations?.montantMensuelTotal || "",
              }
            : {
                _id: id,
                type: "touristes",
                nombreDeNuits: reservations?.nombreDeNuits || "",
                montantTotal: reservations?.montantTotal || "",
              },
      };
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE + "checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          }
        );
        if (response.ok) {
          toast({
            title: "Success",
            description: "Votre paiement a été traité avec succès",
            status: "success",
          });
          router.push("/reservation");
        } else {
          throw new Error("Échec du traitement du paiement");
        }
      } catch (error) {
        console.error("Erreur lors du traitement du paiement :", error);
        toast({
          title: "Erreur",
          description:
            "Une erreur s'est produite lors du traitement de votre paiement",
          status: "error",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complétez votre achat</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Prénom</Label>
                  <Input id="name" value={users?.name || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input id="lastname" value={users?.lastname || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={users?.email || ""}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Anytown USA"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address}</p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Numéro de carte</Label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiration">Expiration</Label>
                    <Select
                      id="expiration"
                      value={expiration}
                      onValueChange={(value) => setExpiration(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="MM/AA" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={`${i + 1}/24`}>{`${
                            i + 1
                          }/24`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expiration && (
                      <p className="text-red-500">{errors.expiration}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
                {reservations?.categorie == "etudiants" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-amount">Mois</Label>
                      <Input
                        id="monthly-amount"
                        type="text"
                        value={reservations?.nombreDeMois || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-amount">Montant Mensuel</Label>
                      <Input
                        id="monthly-amount"
                        type="text"
                        value={reservations?.montantMensuelTotal || ""}
                        readOnly
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-amount">Nuits</Label>
                      <Input
                        id="monthly-amount"
                        type="text"
                        value={reservations?.nombreDeNuits || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-amount">Montant Total</Label>
                      <Input
                        id="total-amount"
                        type="text"
                        value={reservations?.montantTotal || ""}
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-end space-x-4">
            <Button className="mt-4 w-full" type="submit">
              Payer
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Checkout;
