import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";

export default function ServiceCard({ service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group glass flex h-full flex-col rounded-xl p-6 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-float">
      <span className="neu-raised grid h-12 w-12 place-items-center rounded-lg text-royal"><Icon name={service.icon} className="h-6 w-6" /></span>
      <h3 className="mt-5 text-xl font-bold">{service.name}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-quiet">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-royal">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}
