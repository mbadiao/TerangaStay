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
import {
  MdOutlineBed,
  MdOutlineApartment,
  MdOutlineShower,
  MdOutlineMap,
  MdOutlineLocationOn,
  MdOutlineImage,
} from "react-icons/md";
import ImageUploading from "react-images-uploading";

export default function Hote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    country: { value: "AF", label: "Afghanistan" },
    address: "",
    propertyCategory: "",
    monthlyPrice: "",
    nightlyPrice: "",
    city: "Dakar",
    zip: "11000",
    amenities: {
      kingSizeBed: true,
      privateBathroom: true,
      flatScreenTv: false,
      freeWifi: false,
      privateTerrace: false,
      airConditioning: false,
      safe: false,
    },
    guests: "3",
    bedrooms: "3",
    beds: "3",
    bathrooms: "3",
    title: "aaaaaaaaaaaaaaaaaaaaa",
    description:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    checkInTime: "15:23",
    checkOutTime: "13:25",
    houseRules:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    cancellationPolicy:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  });
  const [images, setImages] = useState([]);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [address, setAddress] = useState();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleImageUploadClick = (event) => {
    event.preventDefault();
  };

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
        address,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, address, images };
    console.log("Form Data: ", data);
  };

  return (
    <Card className="max-w-4xl mx-auto border-none shadow-none p-6 sm:p-8 md:p-10 h-screen">
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
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="entire-home">
                      Maison Entière
                    </SelectItem>
                    <SelectItem value="private-room">
                      Chambre Privée
                    </SelectItem>
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
                  address={formData.address}
                  setAddress={(value) =>
                    setFormData({ ...formData, address: value })
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-2">
                <Label
                  htmlFor="propertyCategory"
                  className="flex items-center"
                >
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
                <Label
                  htmlFor="description"
                  className="flex items-center"
                >
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
                <Label
                  htmlFor="checkInTime"
                  className="flex items-center"
                >
                  <MdOutlineMap className="mr-2 h-5 w-5" />
                  Heure d'Arrivée
                </Label>
                <Input
                  id="checkInTime"
                  name="checkInTime"
                  type="time"
                  value={formData.checkInTime}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="checkOutTime"
                  className="flex items-center"
                >
                  <MdOutlineMap className="mr-2 h-5 w-5" />
                  Heure de Départ
                </Label>
                <Input
                  id="checkOutTime"
                  name="checkOutTime"
                  type="time"
                  value={formData.checkOutTime}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="houseRules"
                  className="flex items-center"
                >
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
            <>
              <div className="grid gap-2">
                <Label className="flex items-center">
                  <MdOutlineImage className="mr-2 h-5 w-5" />
                  Téléchargez des Photos
                </Label>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={(imageList) => setImages(imageList)}
                  maxNumber={10}
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
                        onClick={onImageUpload}
                        className="border p-2 rounded mb-2"
                      >
                        Téléchargez des images
                      </button>
                      &nbsp;
                      <button
                        onClick={onImageRemoveAll}
                        className="border p-2 rounded mb-2"
                      >
                        Supprimer toutes les images
                      </button>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.data_url} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button
                              onClick={() => onImageUpdate(index)}
                              className="border p-2 rounded mb-2"
                            >
                              Mettre à jour
                            </button>
                            <button
                              onClick={() => onImageRemove(index)}
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
            </>
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
              <Button type="submit">Soumettre</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
