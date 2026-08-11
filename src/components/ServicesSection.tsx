import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

interface Props {
  showHeading?: boolean;
}

export const ServicesSection = ({ showHeading = true }: Props) => (
  <section id="services" className="section-padding bg-background">
    <div className="container-narrow">
      {showHeading && (
        <Reveal className="text-center">
          <p className="eyebrow">Categories</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary">
            Our Services
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to make your saree celebration-ready.
          </p>
          <div className="motif-divider mt-6" />
        </Reveal>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={(i % 3) * 80} as="div" className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
