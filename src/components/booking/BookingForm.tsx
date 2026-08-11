import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SareeCountSelector from "@/components/booking/SareeCountSelector";
import SareeTypeSelector from "@/components/booking/SareeTypeSelector";
import ServiceSelector from "@/components/booking/ServiceSelector";
import RequiredByDatePicker from "@/components/booking/RequiredByDatePicker";
import FestiveServiceSelector from "@/components/booking/FestiveServiceSelector";
import CustomerDetails from "@/components/booking/CustomerDetails";
import BookingSummary from "@/components/booking/BookingSummary";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { whatsappLink } from "@/data/business";
import {
  buildEmailFallback,
  buildWhatsAppMessage,
  emptyBooking,
  isValidIndianPhone,
  type BookingData,
} from "@/lib/booking";

type Stage = "form" | "summary" | "done";

const Step = ({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl border border-border bg-card/70 p-5 shadow-soft sm:p-7">
    <h2 className="mb-5 flex items-center gap-3 font-serif text-xl text-primary">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        {index}
      </span>
      {title}
    </h2>
    {children}
  </section>
);

export const BookingForm = () => {
  const location = useLocation();
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("form");

  // Preselect service / festival when arriving from another page.
  useEffect(() => {
    const state = location.state as { service?: string; festival?: string } | null;
    if (!state) return;
    setData((prev) => ({
      ...prev,
      servicesRequired:
        state.service && !prev.servicesRequired.includes(state.service)
          ? [...prev.servicesRequired, state.service]
          : prev.servicesRequired,
      festivalOccasion: state.festival ?? prev.festivalOccasion,
    }));
  }, [location.state]);

  const update = (patch: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!data.sareeCount) next.sareeCount = "Please select how many sarees you have.";
    if (data.sareeTypes.length === 0) next.sareeTypes = "Please select at least one saree type.";
    if (data.servicesRequired.length === 0)
      next.servicesRequired = "Please select at least one service.";
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isValidIndianPhone(data.phone))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!data.location.trim()) next.location = "Please enter your location.";
    setErrors(next);
    return next;
  };

  const handleReview = () => {
    const next = validate();
    if (Object.keys(next).length > 0) {
      toast({
        title: "Some details are missing",
        description: "Please complete the highlighted fields.",
        variant: "destructive",
      });
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus?.();
      return;
    }
    setStage("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappHref = whatsappLink(buildWhatsAppMessage(data));
  const emailHref = buildEmailFallback(data);

  const handleSend = () => {
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    setStage("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "done") {
    return <BookingConfirmation whatsappHref={whatsappHref} emailHref={emailHref} />;
  }

  if (stage === "summary") {
    return <BookingSummary data={data} onEdit={() => setStage("form")} onSend={handleSend} />;
  }

  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleReview();
      }}
    >
      <Step index={1} title="Your sarees">
        <div className="grid gap-6">
          <SareeCountSelector
            value={data.sareeCount}
            approx={data.approxCount}
            onChange={(v) => update({ sareeCount: v })}
            onApproxChange={(v) => update({ approxCount: v })}
            error={errors.sareeCount}
          />
          <SareeTypeSelector
            selected={data.sareeTypes}
            other={data.otherSareeType}
            onChange={(v) => update({ sareeTypes: v })}
            onOtherChange={(v) => update({ otherSareeType: v })}
            error={errors.sareeTypes}
          />
        </div>
      </Step>

      <Step index={2} title="Services & timing">
        <div className="grid gap-6">
          <ServiceSelector
            selected={data.servicesRequired}
            onChange={(v) => update({ servicesRequired: v })}
            error={errors.servicesRequired}
          />
          <RequiredByDatePicker
            date={data.requiredByDate}
            onChange={(d) => update({ requiredByDate: d })}
          />
        </div>
      </Step>

      <FestiveServiceSelector
        festivalOccasion={data.festivalOccasion}
        festiveService={data.festiveService}
        onFestivalChange={(name) => update({ festivalOccasion: name })}
        onFestiveServiceChange={(value) => update({ festiveService: value })}
      />

      <Step index={3} title="Your details">
        <CustomerDetails data={data} errors={errors} onChange={update} />
      </Step>

      <div className="sticky bottom-4 z-10">
        <Button type="submit" size="lg" className="w-full rounded-full shadow-lift">
          Review Booking Request
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
