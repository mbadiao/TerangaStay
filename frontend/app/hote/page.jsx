"use client";
import { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select as UiSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFileText,
} from "react-icons/ai";
import * as SDK from "node-appwrite";
import {
  MdOutlineBed,
  MdOutlineApartment,
  MdOutlineShower,
  MdOutlineMap,
  MdOutlineLocationOn,
  MdOutlineImage,
} from "react-icons/md";
import ImageUploading from "react-images-uploading";

import { useToast } from "@/components/ui/use-toast";
export default function Hote() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: "",
    country: {},
    address: "",
    propertyCategory: "",
    monthlyPrice: "",
    nightlyPrice: "",
    city: "",
    zip: "",
    amenities: {
      kingSizeBed: false,
      privateBathroom: false,
      flatScreenTv: false,
      freeWifi: false,
      privateTerrace: false,
      airConditioning: false,
      safe: false,
    },
    guests: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    title: "",
    description: "",
    houseRules: "",
    cancellationPolicy: "",
  });

  const client = new SDK.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);

  const [images, setImages] = useState([]);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        amenities: { ...formData.amenities, [name]: checked },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = async (images) => {
    const storageClient = new SDK.Storage(client);
    const uploadedImageIds = [];

    try {
      for (let image of images) {
        const response = await storageClient.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          SDK.ID.unique(),
          image.file
        );
        const imageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_IMAGE_ENDPOINT}${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
        uploadedImageIds.push(imageUrl);
      }
      return uploadedImageIds;
    } catch (error) {
      toast({
        title: "Error uploading images",
        description: `${error}`,
      });
      return;
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageIds = await handleImageUpload(images);
      const Data = { ...formData, uploadedImageIds };
      const response = await fetch(process.env.NEXT_PUBLIC_BASE + "property", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Post Success",
          description: "Your post has been successfully submitted",
        });
      } else {
        toast({
          title: "Error",
          description: `${data.message}`,
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: `${e.message}`,
      });
    }
  };
  return (
    <Card className="max-w-4xl mx-auto border-none shadow-none p-6 sm:p-8 md:p-10 min-h-screen">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center">
          <AiOutlineHome className="mr-2 h-6 w-6" />
          Devenir Hôte
        </CardTitle>
        <CardDescription>
          Inscrivez votre propriété sur notre plateforme.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="propertyType" className="flex items-center">
                  <AiOutlineHome className="mr-2 h-5 w-5" />
                  Type de Propriété
                </Label>
                <UiSelect
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    handleSelectChange("propertyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type de propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="appartement">Appartement</SelectItem>
                  </SelectContent>
                </UiSelect>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country" className="flex items-center">
                  <MdOutlineMap className="mr-2 h-5 w-5" />
                  Pays/Région
                </Label>
                <Select
                  options={countryOptions}
                  value={formData.country}
                  onChange={(value) => handleSelectChange("country", value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="flex items-center">
                  <MdOutlineLocationOn className="mr-2 h-5 w-5" />
                  Adresse
                </Label>
                <AddressAutocomplete
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="propertyCategory" className="flex items-center">
                  <AiOutlineHome className="mr-2 h-5 w-5" />
                  Catégorie de Propriété
                </Label>
                <UiSelect
                  value={formData.propertyCategory}
                  onValueChange={(value) =>
                    handleSelectChange("propertyCategory", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Touristes/Étudiants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etudiants">Étudiants</SelectItem>
                    <SelectItem value="touristes">Touristes</SelectItem>
                  </SelectContent>
                </UiSelect>
              </div>
              {formData.propertyCategory === "etudiants" && (
                <div className="grid gap-2">
                  <Label htmlFor="monthlyPrice">Prix par mois</Label>
                  <Input
                    id="monthlyPrice"
                    name="monthlyPrice"
                    type="number"
                    value={formData.monthlyPrice}
                    onChange={handleChange}
                    placeholder="Entrez le prix par mois"
                    className="border p-2 rounded"
                  />
                </div>
              )}
              {formData.propertyCategory === "touristes" && (
                <div className="grid gap-2">
                  <Label htmlFor="nightlyPrice">Prix par nuit</Label>
                  <Input
                    id="nightlyPrice"
                    name="nightlyPrice"
                    type="number"
                    value={formData.nightlyPrice}
                    onChange={handleChange}
                    placeholder="Entrez le prix par nuit"
                    className="border p-2 rounded"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="city" className="flex items-center">
                  <MdOutlineLocationOn className="mr-2 h-5 w-5" />
                  Ville
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Entrez la ville"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip" className="flex items-center">
                  <MdOutlineLocationOn className="mr-2 h-5 w-5" />
                  Code Postal
                </Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Entrez le code postal"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-2">
                <Label className="flex items-center">
                  <MdOutlineBed className="mr-2 h-5 w-5" />
                  Aménités
                </Label>
                {[
                  "kingSizeBed",
                  "privateBathroom",
                  "flatScreenTv",
                  "freeWifi",
                  "privateTerrace",
                  "airConditioning",
                  "safe",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      name={amenity}
                      checked={formData.amenities[amenity]}
                      onCheckedChange={(value) =>
                        handleSelectChange("amenities", {
                          ...formData.amenities,
                          [amenity]: value,
                        })
                      }
                    />
                    <Label htmlFor={amenity}>{amenity}</Label>
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guests" className="flex items-center">
                  <AiOutlineUser className="mr-2 h-5 w-5" />
                  Nombre de Voyageurs
                </Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Entrez le nombre de voyageurs"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bedrooms" className="flex items-center">
                  <MdOutlineApartment className="mr-2 h-5 w-5" />
                  Nombre de Chambres
                </Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Entrez le nombre de chambres"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="beds" className="flex items-center">
                  <MdOutlineBed className="mr-2 h-5 w-5" />
                  Nombre de Lits
                </Label>
                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="Entrez le nombre de lits"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bathrooms" className="flex items-center">
                  <MdOutlineShower className="mr-2 h-5 w-5" />
                  Nombre de Salles de Bain
                </Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Entrez le nombre de salles de bain"
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="title" className="flex items-center">
                  <AiOutlineFileText className="mr-2 h-5 w-5" />
                  Titre de l'Annonce
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Entrez le titre de l'annonce"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="flex items-center">
                  <AiOutlineFileText className="mr-2 h-5 w-5" />
                  Description de l'Annonce
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Entrez la description de l'annonce"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="houseRules" className="flex items-center">
                  <MdOutlineMap className="mr-2 h-5 w-5" />
                  Règlement Intérieur
                </Label>
                <Textarea
                  id="houseRules"
                  name="houseRules"
                  value={formData.houseRules}
                  onChange={handleChange}
                  placeholder="Entrez les règles de la maison"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="cancellationPolicy"
                  className="flex items-center"
                >
                  <MdOutlineMap className="mr-2 h-5 w-5" />
                  Politique d'Annulation
                </Label>
                <Textarea
                  id="cancellationPolicy"
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  placeholder="Entrez la politique d'annulation"
                />
              </div>
            </>
          )}

          {step === 5 && (
            <div className="grid gap-2">
              <Label className="flex items-center">
                <MdOutlineImage className="mr-2 h-5 w-5" />
                Téléchargez des Photos
              </Label>
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList) => setImages(imageList)}
                maxNumber={5}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                }) => (
                  <div className="upload__image-wrapper">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onImageUpload();
                      }}
                      className="border p-2 rounded mb-2"
                    >
                      Téléchargez des images
                    </button>
                    &nbsp;
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onImageRemoveAll();
                      }}
                      className="border p-2 rounded mb-2"
                    >
                      Supprimer toutes les images
                    </button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onImageUpdate(index);
                            }}
                            className="border p-2 rounded mb-2"
                          >
                            Mettre à jour
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onImageRemove(index);
                            }}
                            className="border p-2 rounded mb-2"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                Précédent
              </Button>
            )}
            {step < 5 ? (
              <Button type="button" onClick={nextStep}>
                Suivant
              </Button>
            ) : (
              <Button type="button" onClick={onSubmit}>
                Soumettre
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
