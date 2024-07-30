import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flip-words";
import { BlurFadeDemo } from "./ImageHero";
export function Hero() {
  const words = ["Chambre Étudiante", "Hôtel Idéal"];
  return (
    <section className="w-full py-12 md:py-20 lg:py-30">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            Trouvez Votre <br />
            <FlipWords words={words} /> <br />
            avec CaZa
          </h1>
          <p className="max-w-[600px] text-secondary-foreground md:text-xl">
            Découvrez notre sélection de chambres étudiantes et d'hôtels pour un
            séjour parfait.
          </p>
        </div>
        <BlurFadeDemo/>
      </div>
    </section>
  );
}
