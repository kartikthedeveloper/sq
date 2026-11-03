export const cn = (...c) => c.filter(Boolean).join(" ");

export const readingTime = (sections) => {
  const words = sections
    .flatMap((s) => [s.heading, ...(s.paragraphs || []), ...(s.list || [])])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
