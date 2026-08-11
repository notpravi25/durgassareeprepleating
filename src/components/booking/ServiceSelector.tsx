import { Label } from "@/components/ui/label";
import MultiSelect from "@/components/booking/MultiSelect";
import FieldError from "@/components/booking/FieldError";
import { serviceNames } from "@/data/services";

interface Props {
  selected: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export const ServiceSelector = ({ selected, onChange, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="services-required">
      What services do you need? <span className="text-destructive">*</span>
    </Label>
    <MultiSelect
      id="services-required"
      options={serviceNames}
      selected={selected}
      onChange={onChange}
      placeholder="Select one or more services"
      invalid={!!error}
    />
    <p className="text-xs text-muted-foreground">
      You can combine services, e.g. Normal Pre-Pleating + Tassels + Box Folding.
    </p>
    <FieldError message={error} />
  </div>
);

export default ServiceSelector;
