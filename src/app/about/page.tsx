import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { brand } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Align Care Dental Lab, our 25+ years of expertise, and our digital-first approach to dental precision.",
};

export default function AboutPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionTitle
          eyebrow="About Us"
          title="Trusted Dental Expertise, Modern Digital Workflows"
          description={brand.heroDescription}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="relative h-52 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/services/dental-lab-services/dental-lab-services-workflow.jpeg"
              alt="Dental lab workflow"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative h-52 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/services/digital-smile-design/digital-smile-design-front.jpeg"
              alt="Digital smile design"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative h-52 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/services/clear-aligners/clear-aligners-closeup.jpeg"
              alt="Clear aligner detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Our Mission</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Support dentists and orthodontists with reliable, high-quality lab and aligner solutions that improve treatment
              confidence and patient outcomes.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Our Experience</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              With more than 25 years in aligner and dental workflows, our team combines technical craftsmanship with
              digital precision.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Our Technology</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We use digital planning and structured production stages to maintain repeatability, quality control, and
              predictable case delivery.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Our Commitment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We prioritize transparent collaboration, technical consistency, and practical support for every partner
              clinic and case.
            </p>
          </article>
        </div>
      </Container>
    </div>
  );
}
