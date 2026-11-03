import { z } from "zod";

const text = (min, max, label) =>
  z.string({ error: `${label} is required` }).trim().min(min, `${label} is too short`).max(max, `${label} is too long`);

const phone = z
  .string()
  .trim()
  .max(20)
  .regex(/^(\+?\d[\d\s-]{6,17})?$/, "Enter a valid phone number")
  .optional()
  .default("");

// Honeypot (hp) must stay empty; ts is the time the form loaded (checked server-side).
const antiSpam = { hp: z.string().max(0).optional().default(""), ts: z.number().optional() };

export const serviceOptions = [
  "Website development", "Next.js development", "Web application", "Software development", "Mobile app",
  "AI / ML", "Generative AI", "Chatbot", "ERP / CRM", "Cloud / DevOps", "Cybersecurity",
  "Digital marketing", "SEO / GEO", "UI/UX design", "E-commerce", "Business automation", "IT consulting", "Not sure yet",
];

export const contactSchema = z.object({
  name: text(2, 80, "Name"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone,
  service: z.string().trim().max(60).optional().default(""),
  message: text(10, 2000, "Message"),
  type: z.enum(["contact", "consultation", "career"]).optional().default("contact"),
  ...antiSpam,
});

export const quoteSchema = z.object({
  name: text(2, 80, "Name"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone,
  company: z.string().trim().max(100).optional().default(""),
  service: text(2, 60, "Service"),
  budget: z.string().trim().max(40).optional().default(""),
  timeline: z.string().trim().max(40).optional().default(""),
  message: text(20, 3000, "Project details"),
  ...antiSpam,
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(120),
  ...antiSpam,
});

export const budgetOptions = ["Under ₹50,000", "₹50,000 – ₹2,00,000", "₹2,00,000 – ₹10,00,000", "Above ₹10,00,000", "Not decided"];
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "Flexible"];
