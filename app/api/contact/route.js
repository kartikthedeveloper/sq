import { handleForm } from "@/lib/formHandler";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleForm(request, {
    schema: contactSchema,
    label: "New website enquiry",
    subject: (d) => `[Success Qube] ${d.type === "career" ? "Career enquiry" : d.type === "consultation" ? "Consultation request" : "Contact enquiry"} from ${d.name}`,
  });
}
