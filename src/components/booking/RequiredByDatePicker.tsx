import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  date?: Date;
  onChange: (date?: Date) => void;
}

export const RequiredByDatePicker = ({ date, onChange }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-2">
      <Label htmlFor="required-by">When do you need your saree(s) back?</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="required-by"
            type="button"
            variant="outline"
            className={cn(
              "h-11 w-full justify-start rounded-xl bg-card font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {date ? format(date, "PPP") : "Required by date (optional)"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            disabled={(d) => d < today}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
          {date && (
            <div className="border-t border-border p-2">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => onChange(undefined)}>
                Clear date
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">Optional — leave blank if you're flexible.</p>
    </div>
  );
};

export default RequiredByDatePicker;
