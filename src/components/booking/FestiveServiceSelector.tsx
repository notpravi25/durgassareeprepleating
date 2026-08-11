import { Flower2, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FestivalCard from "@/components/FestivalCard";
import { festivals } from "@/data/festivals";
import { festiveServiceOptions } from "@/data/services";
import { Button } from "@/components/ui/button";

interface Props {
  festivalOccasion: string;
  festiveService: string;
  onFestivalChange: (name: string) => void;
  onFestiveServiceChange: (value: string) => void;
}

export const FestiveServiceSelector = ({
  festivalOccasion,
  festiveService,
  onFestivalChange,
  onFestiveServiceChange,
}: Props) => (
  <section
    aria-labelledby="festive-corner"
    className="rounded-2xl border border-gold/40 bg-gradient-soft p-5 sm:p-7"
  >
    <div className="text-center">
      <h2 id="festive-corner" className="font-serif text-2xl text-primary">
        🪔 Festive Corner
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        Get ready for the celebrations with beautiful saree styling and festive services.
      </p>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {festivals.map((festival) => (
        <FestivalCard
          key={festival.id}
          festival={festival}
          selected={festivalOccasion === festival.name}
          onSelect={(f) => onFestivalChange(festivalOccasion === f.name ? "" : f.name)}
        />
      ))}
    </div>

    {festivalOccasion && (
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-muted-foreground">
          Selected occasion: <strong className="text-primary">{festivalOccasion}</strong>
        </span>
        <Button variant="ghost" size="sm" onClick={() => onFestivalChange("")}>
          Clear
        </Button>
      </div>
    )}

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <article className="rounded-xl border border-border bg-card p-5">
        <Flower2 className="h-5 w-5 text-accent" aria-hidden="true" />
        <h3 className="mt-3 font-serif text-lg text-primary">Saree Draping for Festivals</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Professional saree draping for festive occasions.
        </p>
      </article>
      <article className="rounded-xl border border-border bg-card p-5">
        <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
        <h3 className="mt-3 font-serif text-lg text-primary">God/Goddess Idol Decoration</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Festive decoration services for God/Goddess idols.
        </p>
      </article>
    </div>

    <fieldset className="mt-7">
      <Label asChild>
        <legend className="mb-3 text-sm font-medium">Festive Service</legend>
      </Label>
      <RadioGroup
        value={festiveService}
        onValueChange={onFestiveServiceChange}
        className="grid gap-2 sm:grid-cols-2"
      >
        {festiveServiceOptions.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm transition-colors ${
              festiveService === option ? "border-gold bg-secondary" : "border-border hover:border-accent/60"
            }`}
          >
            <RadioGroupItem value={option} id={`festive-${option}`} />
            <span>{option}</span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  </section>
);

export default FestiveServiceSelector;
