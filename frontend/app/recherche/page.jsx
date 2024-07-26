import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CardItem, CardContainer, CardBody } from "@/components/3d-card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/Date-range-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ThreeDCard } from "@/components/card";

export default function Recherche() {
  const img =
    "https://img.freepik.com/free-photo/city-water_1417-1903.jpg?w=740&t=st=1721500580~exp=1721501180~hmac=2f8551aefa1426fe477e663a8445311f1f3eb499aefb609749ae107bf781bb7f";

  return (
     <div className="flex flex-col min-h-screen">
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
         <div className="container  mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center  gap-4 w-full max-w-4xl">
            <div className="bg-gray-100 rounded-full flex-1 flex items-center gap-4 px-4 py-2">
               <SearchIcon className="w-5 h-5 text-gray-500" />
               <Input
                 type="text"
                 placeholder="Où voulez-vous aller ?"
                 className="bg-transparent w-60 flex-1 focus:outline-none"
               />
             </div>
             Date
               <DatePickerWithRange/>
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
             <Button size="lg" className="w-full h-12">
               Rechercher
             </Button>
           </div> 
         </div>
       </header>
       <ThreeDCard/> 
    </div>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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
