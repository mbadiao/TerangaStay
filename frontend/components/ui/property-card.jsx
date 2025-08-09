"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star, Users, Bed, Bath, Wifi, Car } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter } from "./card";
import { cn } from "@/lib/utils";

export function PropertyCard({
  property,
  className,
  showFavorite = true,
  onFavoriteToggle,
  size = "default",
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(property._id, !isFavorite);
  };

  const sizeClasses = {
    sm: "max-w-sm",
    default: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const imageAspectRatio = {
    sm: "aspect-[4/3]",
    default: "aspect-[16/10]",
    lg: "aspect-[16/9]",
    xl: "aspect-[21/9]",
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const getPropertyTypeColor = (type) => {
    const colors = {
      appartement: "bg-blue-100 text-blue-800",
      hotel: "bg-purple-100 text-purple-800",
      maison: "bg-green-100 text-green-800",
      villa: "bg-orange-100 text-orange-800",
    };
    return colors[type?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const mainImage = property?.uploadedImageIds?.[0] || "/placeholder.svg";

  return (
    <Card className={cn("group overflow-hidden hover:shadow-lg transition-all duration-300", sizeClasses[size], className)}>
      <div className="relative">
        {/* Image Container */}
        <div className={cn("relative overflow-hidden bg-gray-100", imageAspectRatio[size])}>
          <Image
            src={imageError ? "/placeholder.svg" : mainImage}
            alt={property?.title || "Property"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={cn("text-xs font-medium", getPropertyTypeColor(property?.propertyType))}>
            {property?.propertyType || "N/A"}
          </Badge>
        </div>

        {/* Favorite Button */}
        {showFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")}
            />
          </Button>
        )}

        {/* Image Count Indicator */}
        {property?.uploadedImageIds?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {property.uploadedImageIds.length} photos
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span className="truncate">
            {property?.city}, {property?.country?.label || property?.country}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
          {property?.title || "Propriété sans titre"}
        </h3>

        {/* Description */}
        {property?.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Amenities */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {property?.guests && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{property.guests} invités</span>
            </div>
          )}
          {property?.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} ch.</span>
            </div>
          )}
          {property?.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} sdb</span>
            </div>
          )}
        </div>

        {/* Key Amenities */}
        {property?.amenities && (
          <div className="flex flex-wrap gap-1">
            {property.amenities.freeWifi && (
              <Badge variant="secondary" className="text-xs">
                <Wifi className="h-3 w-3 mr-1" />
                WiFi
              </Badge>
            )}
            {property.amenities.airConditioning && (
              <Badge variant="secondary" className="text-xs">
                Clim
              </Badge>
            )}
            {property.amenities.privateTerrace && (
              <Badge variant="secondary" className="text-xs">
                Terrasse
              </Badge>
            )}
          </div>
        )}

        {/* Rating */}
        {property?.rating && (
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{property.rating}</span>
            {property?.reviewCount && (
              <span className="text-xs text-gray-500 ml-1">
                ({property.reviewCount} avis)
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(property?.nightlyPrice || property?.monthlyPrice || 0)}
            </span>
            <span className="text-sm text-gray-600">XOF</span>
          </div>
          <span className="text-xs text-gray-500">
            {property?.propertyCategory === "etudiants" ? "par mois" : "par nuit"}
          </span>
        </div>

        {/* View Details Button */}
        <Link href={`/rooms/${property?._id}`}>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Voir détails
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function PropertyCardSkeleton({ size = "default" }) {
  const sizeClasses = {
    sm: "max-w-sm",
    default: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const imageAspectRatio = {
    sm: "aspect-[4/3]",
    default: "aspect-[16/10]",
    lg: "aspect-[16/9]",
    xl: "aspect-[21/9]",
  };

  return (
    <Card className={cn("overflow-hidden", sizeClasses[size])}>
      <div className={cn("bg-gray-200 animate-pulse", imageAspectRatio[size])} />
      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
      </CardFooter>
    </Card>
  );
}

export function PropertyGrid({
  properties = [],
  loading = false,
  cardSize = "default",
  showFavorites = true,
  onFavoriteToggle,
  className,
  emptyState
}) {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} size={cardSize} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        {emptyState || (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune propriété trouvée
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          size={cardSize}
          showFavorite={showFavorites}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}
