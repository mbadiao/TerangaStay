"use client";
import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-services";
import { Input } from "@/components/ui/input";


const AddressAutocomplete = ({ value, onChange }) => {
  const inputRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_TOMTOM_API_KEY) {
      console.error("TomTom API key is missing");
      return;
    }

    const handleInput = (e) => {
      tt.services.fuzzySearch({
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        query: e.target.value,
        language: 'fr',
      })
      .then((response) => {
        const suggestions = response.results.map(result => result.address.freeformAddress);
        setSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error fetching TomTom data:", error);
      });
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter address"
        className="input"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
