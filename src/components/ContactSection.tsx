import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { business, whatsappLink } from "@/data/business";

export const ContactSection = () => {
  const waHref = whatsappLink(
    "Hello! I have a question about your saree pre-pleating services.",
  );

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary">
            Get in Touch
          </h1>
          <div className="motif-divider mt-6" />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl text-primary">Phone</h2>
              <a
                href={`tel:+91${business.phone}`}
                className="mt-2 inline-block text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {business.phone}
              </a>
            </article>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl text-primary">Email</h2>
              <a
                href={`mailto:${business.email}`}
                className="mt-2 inline-block break-all text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {business.email}
              </a>
            </article>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl text-primary">Location</h2>
              <p className="mt-2 text-sm text-muted-foreground">{business.locationLabel}</p>
              <p className="mt-1 text-xs text-muted-foreground">{business.locationNote}</p>
              {business.mapsUrl ? (
                <Button asChild variant="outline" className="mt-4 rounded-full">
                  <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              ) : (
                <Button variant="outline" className="mt-4 rounded-full" disabled>
                  Get Directions (coming soon)
                </Button>
              )}
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-12 rounded-2xl bg-secondary p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary">
            Have a question about your saree?
          </h2>
          <p className="mt-2 text-muted-foreground">We're happy to help.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <a href={`tel:+91${business.phone}`}>
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> Call Us
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={`mailto:${business.email}`}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> Email Us
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
