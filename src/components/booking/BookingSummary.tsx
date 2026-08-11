import { Button } from "@/components/ui/button";
import { formatDate, sareeCountLabel, sareeTypesLabel, type BookingData } from "@/lib/booking";

interface Props {
  data: BookingData;
  onEdit: () => void;
  onSend: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:gap-4">
    <dt className="w-44 shrink-0 text-xs uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </dt>
    <dd className="text-sm text-foreground">{value}</dd>
  </div>
);

export const BookingSummary = ({ data, onEdit, onSend }: Props) => (
  <section aria-labelledby="summary-heading" className="animate-fade-in">
    <h2 id="summary-heading" className="font-serif text-2xl text-primary">
      Your Booking Request
    </h2>
    <p className="mt-1 text-sm text-muted-foreground">
      Please review the details before sending them on WhatsApp.
    </p>

    <dl className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <Row label="Sarees" value={sareeCountLabel(data)} />
      <Row label="Saree Types" value={sareeTypesLabel(data)} />
      <Row label="Services" value={data.servicesRequired.join(", ")} />
      <Row label="Required By" value={formatDate(data.requiredByDate)} />
      <Row label="Festive Occasion" value={data.festivalOccasion || "Not specified"} />
      <Row label="Festive Service" value={data.festiveService || "No festive service"} />
      <Row label="Customer" value={data.name} />
      <Row label="Phone" value={data.phone} />
      <Row label="Location" value={data.location} />
      {data.additionalRequirements.trim() && (
        <Row label="Additional Requirements" value={data.additionalRequirements.trim()} />
      )}
    </dl>

    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Button variant="outline" size="lg" className="rounded-full sm:flex-1" onClick={onEdit}>
        Edit Details
      </Button>
      <Button size="lg" className="rounded-full sm:flex-1" onClick={onSend}>
        Send Booking Request
      </Button>
    </div>
  </section>
);

export default BookingSummary;
