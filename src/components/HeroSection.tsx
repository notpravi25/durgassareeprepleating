import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-saree.jpg";

export const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-secondary">
    <div className="absolute inset-0 -z-10">
      <img
        src={heroImage}
        alt="Deep maroon Kanjeevaram silk saree with crisp gold-bordered pleats"
        width={1600}
        height={1200}
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-maroon-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/95 via-maroon-deep/65 to-transparent" />
    </div>


    <div className="container-narrow px-5 sm:px-8 py-24 sm:py-32 lg:py-40">
      <div className="max-w-2xl animate-fade-in">
        <p className="eyebrow text-gold">Pre-pleating · Draping · Festive styling</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-primary-foreground">
          Durga's Saree Pre-Pleating Services
        </h1>
        <p className="mt-5 font-serif text-xl sm:text-2xl italic text-gold">
          Beautiful pleats. Perfect drapes. Effortless elegance.
        </p>
        <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-primary-foreground/85">
          We pre-pleat, drape and finish your sarees — with tassels, ironing, folding, festive
          styling and saree classes — so your saree is always ready to wear.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="rounded-full bg-gold text-accent-foreground hover:bg-gold/90 px-8">
            <Link to="/orders">Book Your Saree Service</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary-foreground/40 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href="#our-creations">Explore Our Work</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
