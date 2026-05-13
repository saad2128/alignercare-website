import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { contactInfo } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Align Care Dental Lab via phone or visit us at our Lahore location.",
};

export default function ContactPage() {
  return (
    <div className="py-14">
      <Container>
        <SectionTitle
          eyebrow="Contact"
          title="Reach Align Care Dental Lab"
          description="For case discussions and service inquiries, connect with us through the contact details below."
        />

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Phone</h2>
            <div className="mt-3 space-y-1">
              {contactInfo.phones.map((phone) => (
                <p key={phone} className="text-sm text-slate-700">
                  {phone}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Address</h2>
            <p className="mt-3 text-sm text-slate-700">{contactInfo.address}</p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Email</h2>
            <p className="mt-3 text-sm text-slate-700">{contactInfo.email}</p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900">Business Hours</h2>
            <p className="mt-3 text-sm text-slate-700">{contactInfo.hours}</p>
          </article>
        </section>
      </Container>
    </div>
  );
}
