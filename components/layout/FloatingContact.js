import { MessageCircle, Phone } from "lucide-react";
import TrackedLink from "@/components/ui/TrackedLink";
import { site, telHref, waHref } from "@/lib/site";

export default function FloatingContact() {
  if (!site.whatsapp && !site.phone) return null;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {site.phone && (
        <TrackedLink href={telHref()} event="phone_click" aria-label="Call Success Qube" className="grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-float hover:bg-royal-deep">
          <Phone className="h-5 w-5" aria-hidden="true" />
        </TrackedLink>
      )}
      {site.whatsapp && (
        <TrackedLink href={waHref()} external event="whatsapp_click" aria-label="Chat with Success Qube on WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-[#128C4A] text-white shadow-float hover:bg-[#0e7a40]">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </TrackedLink>
      )}
    </div>
  );
}
