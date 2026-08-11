import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldError from "@/components/booking/FieldError";

interface Props {
  value: string;
  approx: string;
  onChange: (value: string) => void;
  onApproxChange: (value: string) => void;
  error?: string;
}

export const SareeCountSelector = ({ value, approx, onChange, onApproxChange, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="saree-count">
      How many sarees do you have? <span className="text-destructive">*</span>
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="saree-count"
        aria-invalid={!!error}
        className={`h-11 rounded-xl bg-card ${error ? "border-destructive" : ""}`}
      >
        <SelectValue placeholder="Select number of sarees" />
      </SelectTrigger>
      <SelectContent className="pointer-events-auto">
        {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
          <SelectItem key={n} value={n}>
            {n}
          </SelectItem>
        ))}
        <SelectItem value="more">More than 10</SelectItem>
      </SelectContent>
    </Select>
    <FieldError message={error} />

    {value === "more" && (
      <div className="mt-3 space-y-2 rounded-xl bg-secondary/70 p-4 animate-fade-in">
        <Label htmlFor="approx-count">Approximate Number of Sarees</Label>
        <Input
          id="approx-count"
          type="number"
          inputMode="numeric"
          min={11}
          placeholder="e.g. 15 (optional)"
          value={approx}
          onChange={(e) => onApproxChange(e.target.value)}
          className="h-11 rounded-xl bg-card"
        />
        <p className="text-xs text-muted-foreground">
          An estimate is fine — you don't need the exact number.
        </p>
      </div>
    )}
  </div>
);

export default SareeCountSelector;
