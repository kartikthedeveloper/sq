import { handleForm } from "@/lib/formHandler";
import { quoteSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleForm(request, {
    schema: quoteSchema,
    label: "New quote request",
    subject: (d) => `[Success Qube] Quote request: ${d.service} from ${d.name}`,
  });
}
