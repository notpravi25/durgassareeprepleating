import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { festivals } from "@/data/festivals";

/** Marketing section on the home page that leads into the booking form. */
export const FestivalSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-gradient-festive text-primary-foreground">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow text-gold">Festive corner</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">
            Your Festival Look Starts Here ✨
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-primary-foreground/85">
            Festivals are the perfect time to wear your favourite saree. Get your sarees
            pre-pleated, styled, and ready before the celebration begins.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((festival, i) => (
            <Reveal key={festival.id} delay={(i % 3) * 80} className="h-full">
              <div className="h-full text-foreground">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={festival.image}
                      alt={festival.alt}
                      width={900}
                      height={700}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl text-primary">
                      <span aria-hidden="true" className="mr-1.5">
                        {festival.emoji}
                      </span>
                      {festival.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {festival.description}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 w-full rounded-full"
                      onClick={() => navigate("/orders", { state: { festival: festival.name } })}
                    >
                      Book for this Occasion
                    </Button>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Button
            size="lg"
            className="rounded-full bg-gold px-8 text-accent-foreground hover:bg-gold/90"
            onClick={() => navigate("/orders")}
          >
            Plan Your Festival Look
          </Button>
          <p className="mt-4 text-xs tracking-wide text-primary-foreground/70">
            Festival bookings are recommended in advance.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default FestivalSection;
