import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

export const Gallery = () => {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? galleryItems
        : galleryItems.filter((i) => i.categories.includes(active as any)),
    [active],
  );

  return (
    <section id="our-creations" className="section-padding bg-gradient-soft">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary">
            Our Creations
          </h2>
          <p className="mt-3 text-muted-foreground">
            A collection of sarees we've beautifully prepared and styled.
          </p>
          <div className="motif-divider mt-6" />
        </Reveal>

        <div
          role="tablist"
          aria-label="Gallery categories"
          className="scrollbar-hide mt-8 flex gap-2 overflow-x-auto pb-2 sm:justify-center"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all",
                active === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-2 gap-4 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90}>
              <GalleryCard item={item} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No pieces in this category yet.
          </p>
        )}
      </div>

      <GalleryLightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Gallery;
