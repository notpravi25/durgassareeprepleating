import Reveal from "@/components/Reveal";
import introImage from "@/assets/intro-pleating.jpg";

const occasions = [
  "Festivals",
  "Weddings",
  "Family functions",
  "Religious occasions",
  "Special events",
  "Everyday convenience",
];

export const IntroductionSection = () => (
  <section className="section-padding bg-background">
    <div className="container-narrow grid gap-10 lg:grid-cols-2 lg:items-center">
      <Reveal>
        <p className="eyebrow">Our promise</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
          Where Every Saree Gets the Perfect Finish
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          Your saree is prepared with care — pleats set, pallu finished, fabric pressed — so you
          can simply drape and step out. We help you get ready for:
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {occasions.map((o) => (
            <li key={o} className="flex items-start gap-2 text-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {o}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="relative">
        <div className="overflow-hidden rounded-2xl shadow-lift">
          <img
            src={introImage}
            alt="Hands folding neat pleats into a golden silk saree"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-2xl border border-gold/40"
        />
      </Reveal>
    </div>
  </section>
);

export default IntroductionSection;
