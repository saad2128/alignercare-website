import Image from "next/image";
import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-56 w-full bg-slate-100">
        <Image
          src={service.images[0]}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
      <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.longDescription}</p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-800">Benefits</p>
        <ul className="mt-2 space-y-2">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="text-sm text-slate-600">
              - {benefit}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </article>
  );
}
