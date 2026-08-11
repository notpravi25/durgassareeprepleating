import Layout from "@/components/Layout";
import BookingForm from "@/components/booking/BookingForm";

const Orders = () => (
  <Layout>
    <section className="bg-gradient-soft px-5 pb-10 pt-14 text-center sm:px-8 sm:pt-20">
      <div className="container-narrow">
        <p className="eyebrow">Orders</p>
        <h1 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">
          Book Your Saree Service
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us what you need and we'll get back to you.
        </p>
        <div className="motif-divider mt-6" />
      </div>
    </section>

    <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-8 sm:px-8">
      <BookingForm />
    </div>
  </Layout>
);

export default Orders;
