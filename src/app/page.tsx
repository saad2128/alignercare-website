import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { brand, companyStats, contactInfo, services, trustPoints } from "@/content/site-content";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-cyan-50 via-white to-white py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{brand.tagline}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {brand.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{brand.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                Explore Services
              </Link>
              <Link
                href="/aligners"
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Learn About Aligners
              </Link>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-96">
            <Image
              src={brand.heroImage}
              alt="Digital dental workflow"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle
            eyebrow="Why Kamfe Smile Care Lab"
            title="Precision, Experience, and Digital Reliability"
            description="We deliver treatment-ready dental and aligner solutions with consistent quality controls and modern workflows."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((stat) => (
              <article key={stat.label} className="rounded-xl border border-cyan-100 bg-cyan-50 p-5">
                <p className="text-2xl font-bold text-cyan-800">{stat.value}</p>
                <p className="mt-2 text-sm text-cyan-900">{stat.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <SectionTitle
            eyebrow="Core Services"
            title="Digital Dental Solutions for Modern Practices"
            description="From clear aligners to restorations, our workflows are built for predictable clinical outcomes."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle
            eyebrow="Clinical Gallery"
            title="Visual Highlights from Our Service Workflow"
            description="A curated image grid showing aligner, restorative, and digital planning workflows."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative h-44">
                  <Image
                    src={service.images[1]}
                    alt={`${service.name} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="rounded-2xl bg-slate-900 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Start your digital treatment workflow</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
            Speak with our team to discuss case requirements, aligner planning, and restorative lab support.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-white">
              Call {contactInfo.phones[0]}
            </Link>
            <span className="text-sm text-slate-300">{contactInfo.address}</span>
          </div>
        </Container>
      </section>
    </div>
  );
}
