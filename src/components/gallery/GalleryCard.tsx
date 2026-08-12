import type { GalleryItem } from "@/data/gallery";

interface Props {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
}

export const GalleryCard = ({ item, onOpen }: Props) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    className="zari-card group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl text-left focus-visible:ring-2 focus-visible:ring-ring"
    aria-label={`View ${item.title}`}
  >
    <div className="relative overflow-hidden">
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-maroon-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <p className="font-serif text-lg text-primary-foreground">{item.title}</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
          {item.categories.join(" · ")}
        </p>
      </div>
    </div>
  </button>
);

export default GalleryCard;
