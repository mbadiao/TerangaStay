"use client";

import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ImageUpload({
  value = [],
  onChange,
  maxNumber = 10,
  className,
  disabled = false,
}) {
  const [images, setImages] = useState(value || []);

  const onImageChange = (imageList) => {
    setImages(imageList);
    onChange?.(imageList);
  };

  return (
    <div className={cn("w-full", className)}>
      <ImageUploading
        multiple
        value={images}
        onChange={onImageChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg", "webp"]}
        maxFileSize={5242880} // 5MB
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="space-y-6">
            {/* Upload Area */}
            {imageList.length < maxNumber && (
              <div
                className={cn(
                  "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400",
                  isDragging && "border-primary bg-primary/5",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={!disabled ? onImageUpload : undefined}
                {...dragProps}
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-700">
                      {isDragging
                        ? "Déposez les images ici..."
                        : "Glissez-déposez des images ou cliquez pour sélectionner"}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, WEBP jusqu'à 5MB chacune
                    </p>
                    <p className="text-xs text-gray-400">
                      {imageList.length}/{maxNumber} images ajoutées
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Image Previews Grid */}
            {imageList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Images sélectionnées ({imageList.length})
                  </h4>
                  {imageList.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onImageRemoveAll}
                      disabled={disabled}
                      className="text-red-600 hover:text-red-700"
                    >
                      Supprimer tout
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                        <Image
                          src={image.data_url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>

                      {/* Remove Button */}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onImageRemove(index)}
                        disabled={disabled}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      {/* Update Button */}
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        onClick={() => onImageUpdate(index)}
                        disabled={disabled}
                      >
                        ✎
                      </Button>

                      {/* Image Number */}
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Progress Info */}
            {imageList.length > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>
                      {imageList.length} image(s) prête(s) pour l'upload
                    </span>
                  </div>
                  {imageList.length === maxNumber && (
                    <span className="text-orange-600 font-medium">
                      Limite atteinte
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export function SingleImageUpload({
  value,
  onChange,
  className,
  disabled = false,
  placeholder = "Aucune image sélectionnée",
}) {
  const [images, setImages] = useState(value ? [value] : []);

  const onImageChange = (imageList) => {
    setImages(imageList);
    onChange?.(imageList[0] || null);
  };

  return (
    <div className={cn("w-full", className)}>
      <ImageUploading
        value={images}
        onChange={onImageChange}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg", "webp"]}
        maxFileSize={5242880} // 5MB
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            {imageList.length === 0 ? (
              <div
                className={cn(
                  "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-gray-400",
                  isDragging && "border-primary bg-primary/5",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={!disabled ? onImageUpload : undefined}
                {...dragProps}
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-700">
                      {isDragging
                        ? "Déposez l'image ici..."
                        : "Glissez-déposez une image ou cliquez pour sélectionner"}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, WEBP jusqu'à 5MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <Image
                    src={imageList[0].data_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                  onClick={() => onImageRemove(0)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 left-2 h-8 w-8 rounded-full p-0"
                  onClick={onImageUpload}
                  disabled={disabled}
                >
                  ✎
                </Button>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
