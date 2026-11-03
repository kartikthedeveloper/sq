import { handleForm } from "@/lib/formHandler";
import { newsletterSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sends a notification email to EMAIL_TO. Connect a mailing-list provider here later.
export async function POST(request) {
  return handleForm(request, {
    schema: newsletterSchema,
    label: "New newsletter subscriber",
    subject: (d) => `[Success Qube] Newsletter signup: ${d.email}`,
  });
}
