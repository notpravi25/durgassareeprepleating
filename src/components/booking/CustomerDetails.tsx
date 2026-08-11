import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldError from "@/components/booking/FieldError";
import type { BookingData } from "@/lib/booking";

interface Props {
  data: BookingData;
  errors: Record<string, string>;
  onChange: (patch: Partial<BookingData>) => void;
}

export const CustomerDetails = ({ data, errors, onChange }: Props) => (
  <div className="grid gap-5">
    <div className="space-y-2">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input
        id="name"
        autoComplete="name"
        maxLength={100}
        value={data.name}
        aria-invalid={!!errors.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Your full name"
        className={`h-11 rounded-xl bg-card ${errors.name ? "border-destructive" : ""}`}
      />
      <FieldError message={errors.name} />
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">
        Phone Number <span className="text-destructive">*</span>
      </Label>
      <Input
        id="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        maxLength={15}
        value={data.phone}
        aria-invalid={!!errors.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        placeholder="10-digit mobile number"
        className={`h-11 rounded-xl bg-card ${errors.phone ? "border-destructive" : ""}`}
      />
      <FieldError message={errors.phone} />
    </div>

    <div className="space-y-2">
      <Label htmlFor="location">
        Location <span className="text-destructive">*</span>
      </Label>
      <Textarea
        id="location"
        rows={3}
        maxLength={300}
        value={data.location}
        aria-invalid={!!errors.location}
        onChange={(e) => onChange({ location: e.target.value })}
        placeholder="Area, city and any landmark"
        className={`rounded-xl bg-card ${errors.location ? "border-destructive" : ""}`}
      />
      <FieldError message={errors.location} />
    </div>

    <div className="space-y-2">
      <Label htmlFor="additional">Additional Requirements</Label>
      <Textarea
        id="additional"
        rows={3}
        maxLength={600}
        value={data.additionalRequirements}
        onChange={(e) => onChange({ additionalRequirements: e.target.value })}
        placeholder="Tell us anything else we should know about your saree or service..."
        className="rounded-xl bg-card"
      />
    </div>
  </div>
);

export default CustomerDetails;
