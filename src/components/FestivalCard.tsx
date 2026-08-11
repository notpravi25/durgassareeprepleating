import { Button } from "@/components/ui/button";
import type { Festival } from "@/data/festivals";

interface Props {
  festival: Festival;
  onSelect: (festival: Festival) => void;
  selected?: boolean;
}

export const FestivalCard = ({ festival, onSelect, selected }: Props) => (
  <article
    className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
      selected ? "border-gold ring-2 ring-gold/50" : "border-border"
    }`}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
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
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {festival.description}
      </p>
      <Button
        onClick={() => onSelect(festival)}
        variant={selected ? "default" : "outline"}
        className="mt-4 w-full rounded-full"
      >
        {selected ? "Selected" : "Book for this Occasion"}
      </Button>
    </div>
  </article>
);

export default FestivalCard;
