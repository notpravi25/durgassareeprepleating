import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ServicesSection from "@/components/ServicesSection";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const Categories = () => (
  <Layout>
    <section className="bg-gradient-soft px-5 pb-4 pt-14 text-center sm:px-8 sm:pt-20">
      <div className="container-narrow">
        <p className="eyebrow">Categories</p>
        <h1 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">Our Services</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Everything you need to make your saree celebration-ready.
        </p>
        <div className="motif-divider mt-6" />
      </div>
    </section>

    <ServicesSection showHeading={false} />

    <section className="px-5 pb-20 sm:px-8">
      <Reveal className="container-narrow rounded-2xl bg-secondary p-8 text-center sm:p-12">
        <h2 className="font-serif text-2xl text-primary sm:text-3xl">
          Not sure which service you need?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Share your saree details and we'll guide you.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8">
          <Link to="/orders">Book Now</Link>
        </Button>
      </Reveal>
    </section>
  </Layout>
);

export default Categories;
