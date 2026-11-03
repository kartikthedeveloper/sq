import { cn } from "@/lib/utils";

const inputCls = "neu-inset w-full rounded-lg border border-transparent px-4 py-3 text-ink placeholder:text-quiet/70 focus:border-electric focus:outline-none focus-visible:outline-offset-0";

export function Field({ id, label, error, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}{required && <span className="text-royal" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-sm text-quiet">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

export const inputProps = (id, error, hint) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-err` : hint ? `${id}-hint` : undefined,
  className: cn(inputCls, error && "!border-red-600"),
});

/** Visually hidden honeypot. Real users never see or fill it. */
export function Honeypot({ register }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Leave this field empty<input type="text" tabIndex={-1} autoComplete="off" {...register("hp")} /></label>
    </div>
  );
}

export function FormStatus({ status }) {
  if (!status.state || status.state === "idle") return null;
  const ok = status.state === "success";
  return (
    <p role={ok ? "status" : "alert"} className={cn("rounded-lg px-4 py-3 text-sm font-medium", ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900")}>
      {status.message}
    </p>
  );
}
