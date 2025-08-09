"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ size = "default", className }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export function LoadingOverlay({ children, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <LoadingSpinner size="lg" />
      {children && (
        <p className="text-sm text-gray-600">{children}</p>
      )}
    </div>
  );
}

export function LoadingCard({ title = "Chargement...", className }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md min-h-[200px]",
      className
    )}>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg font-medium text-gray-700">{title}</p>
    </div>
  );
}

export function LoadingPage({ title = "Chargement en cours..." }) {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  );
}
