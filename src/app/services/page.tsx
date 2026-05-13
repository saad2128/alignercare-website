import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { ServiceImageGallery } from "@/components/service-image-gallery";
import { services } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore clear aligners, crowns and bridges, digital smile design, and comprehensive dental lab services by Align Care Dental Lab.",
};

export default function ServicesPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionTitle
          eyebrow="Services"
          title="Integrated Clinical-Lab Services"
          description="Each service is designed for practical workflows, reliable delivery, and treatment predictability."
        />

        <div className="mt-10 space-y-8">
          {services.map((service) => (
            <article key={service.slug} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{service.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.longDescription}</p>

              <ServiceImageGallery name={service.name} images={service.images} />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">Benefits</h3>
                  <ul className="mt-3 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-slate-700">
                        - {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">Process</h3>
                  <ol className="mt-3 space-y-2">
                    {service.process.map((step) => (
                      <li key={step} className="text-sm text-slate-700">
                        - {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">Expected Outcomes</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
