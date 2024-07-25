import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ThreeDCard } from "@/components/card";
export default function Home() {
 
  return (
    <main>
      <Hero />
      <ThreeDCard/>
    </main>
  );
}
