import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flip-words";
import { BlurFadeDemo } from "./ImageHero";
export function Hero() {
  const words = ["Chambre Étudiante", "Hôtel Idéal"];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
          <form className="flex gap-2">
            <Input
              type="text"
              placeholder="Rechercher des propertiées..."
              className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
            />
            <Button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Rechercher
            </Button>
          </form>
        </div>
        <BlurFadeDemo/>
      </div>
    </section>
  );
}
