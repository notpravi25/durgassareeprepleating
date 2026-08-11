import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/booking/MultiSelect";
import FieldError from "@/components/booking/FieldError";
import { sareeTypes } from "@/data/services";

interface Props {
  selected: string[];
  other: string;
  onChange: (values: string[]) => void;
  onOtherChange: (value: string) => void;
  error?: string;
}

export const SareeTypeSelector = ({ selected, other, onChange, onOtherChange, error }: Props) => (
  <div className="space-y-2">
    <Label htmlFor="saree-types">
      What type of saree(s) do you have? <span className="text-destructive">*</span>
    </Label>
    <MultiSelect
      id="saree-types"
      options={sareeTypes}
      selected={selected}
      onChange={onChange}
      placeholder="Select one or more saree types"
      invalid={!!error}
    />
    <FieldError message={error} />

    {selected.includes("Others") && (
      <div className="mt-3 space-y-2 rounded-xl bg-secondary/70 p-4 animate-fade-in">
        <Label htmlFor="other-saree-type">Please specify the saree type</Label>
        <Input
          id="other-saree-type"
          value={other}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="e.g. Tussar silk"
          className="h-11 rounded-xl bg-card"
        />
      </div>
    )}
  </div>
);

export default SareeTypeSelector;
