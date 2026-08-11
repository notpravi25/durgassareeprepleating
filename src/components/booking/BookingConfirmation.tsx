import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  whatsappHref: string;
  emailHref: string;
}

export const BookingConfirmation = ({ whatsappHref, emailHref }: Props) => (
  <section className="animate-scale-in rounded-2xl border border-gold/50 bg-card p-8 text-center shadow-lift sm:p-12">
    <h2 className="font-serif text-3xl text-primary">Booking Request Ready! ❤️</h2>
    <p className="mt-3 text-muted-foreground">
      Your booking details have been prepared for WhatsApp.
    </p>
    <p className="mt-1 font-medium text-foreground">
      Please send the message in WhatsApp to complete your enquiry.
    </p>

    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Open WhatsApp
        </a>
      </Button>
      <Button asChild size="lg" variant="outline" className="rounded-full">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>

    <p className="mt-6 text-sm text-muted-foreground">
      WhatsApp not opening?{" "}
      <a href={emailHref} className="inline-flex items-center gap-1 text-primary underline underline-offset-4">
        <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Send the same details by email
      </a>
      .
    </p>
  </section>
);

export default BookingConfirmation;
