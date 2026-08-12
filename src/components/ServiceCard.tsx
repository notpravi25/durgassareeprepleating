import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";

export const ServiceCard = ({ service }: { service: Service }) => {
  const navigate = useNavigate();
  const Icon = service.icon;

  return (
    <article className="zari-card group flex h-full flex-col rounded-2xl p-6">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-gold/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-serif text-xl text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <Button
        variant="outline"
        className="mt-5 w-full rounded-full border-primary/25 hover:bg-primary hover:text-primary-foreground"
        onClick={() => navigate("/orders", { state: { service: service.name } })}
      >
        Enquire
      </Button>
    </article>
  );
};

export default ServiceCard;
