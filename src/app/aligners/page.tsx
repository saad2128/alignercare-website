import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";
import { SectionTitle } from "@/components/section-title";
import { alignerFaqs, alignerJourney } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Aligner Information",
  description:
    "Learn how clear aligners work, who they are suitable for, treatment timelines, and retention best practices.",
};

export default function AlignersPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionTitle
          eyebrow="Aligner Information"
          title="What Clear Aligners Are and How Treatment Works"
          description="Clear aligners are custom, removable trays that guide gradual tooth movement through pre-planned stages."
        />

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Aligners vs Braces</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Aligners are removable and discreet, while braces are fixed appliances that can be better for certain complex
              movements. Final treatment selection should always follow provider evaluation.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Typical Treatment Journey</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>- Consultation and records collection</li>
              <li>- Digital planning and case approval</li>
              <li>- Aligner manufacturing and delivery</li>
              <li>- Monitoring, refinements, and retention</li>
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Suitability and Limitations</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Mild to moderate cases are often suitable for aligners. Severe crowding, complex bite corrections, or skeletal
              discrepancies may require other orthodontic approaches.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Care and Retention</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Aligners must be worn as prescribed and cleaned routinely. After active treatment, retainers are essential to
              help maintain achieved tooth positions.
            </p>
          </article>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">Treatment Journey</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {alignerJourney.map((step) => (
              <article key={step.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-4">
            <FaqList items={alignerFaqs} />
          </div>
        </section>
      </Container>
    </div>
  );
}
