import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/data/gallery";

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryLightbox = ({ item, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 bg-card">
        {item && (
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[55vh] w-full object-cover md:max-h-[70vh]"
            />
            <div className="flex flex-col justify-center gap-4 p-6">
              <div>
                <p className="eyebrow">{item.categories.join(" · ")}</p>
                <DialogTitle className="mt-2 font-serif text-2xl text-primary">
                  {item.title}
                </DialogTitle>
              </div>
              {item.description && (
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </DialogDescription>
              )}
              <Button
                className="mt-2 rounded-full"
                onClick={() =>
                  navigate("/orders", {
                    state: item.suggestedService ? { service: item.suggestedService } : undefined,
                  })
                }
              >
                Book a Similar Service
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;
