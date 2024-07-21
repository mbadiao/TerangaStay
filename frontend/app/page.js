import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ThreeDCardDemo } from "@/components/card";
export default function Home() {
 
  return (
    <main>
      <Hero />
      <ThreeDCardDemo/>
    </main>
  );
}
