import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  id: string;
  invalid?: boolean;
}

/** Accessible checkbox multi-select used for saree types and services. */
export const MultiSelect = ({ options, selected, onChange, placeholder, id, invalid }: Props) => {
  const toggle = (value: string) =>
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-invalid={invalid}
          className={cn(
            "h-auto min-h-11 w-full justify-between whitespace-normal rounded-xl bg-card px-4 py-2.5 text-left font-normal",
            invalid && "border-destructive",
            selected.length === 0 && "text-muted-foreground",
          )}
        >
          <span className="flex-1">{selected.length ? selected.join(", ") : placeholder}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="pointer-events-auto max-h-72 w-[var(--radix-popover-trigger-width)] overflow-y-auto p-2"
      >
        <ul className="space-y-0.5">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <li key={option}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary",
                    checked && "bg-secondary",
                  )}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggle(option)} />
                  <span className="flex-1">{option}</span>
                  {checked && <Check className="h-4 w-4 text-accent" aria-hidden="true" />}
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
