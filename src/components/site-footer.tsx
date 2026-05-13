import Link from "next/link";
import { Container } from "@/components/container";
import { contactInfo, navItems } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 py-10">
      <Container className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-slate-900">Align Care Dental Lab</p>
          <p className="mt-2 text-sm text-slate-600">
            Trusted digital dental workflows for aligners, restorative accuracy, and quality-focused outcomes.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">Quick links</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate-700 hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="text-sm text-slate-700 hover:text-slate-900">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">Contact</p>
          <div className="mt-3 space-y-1">
            {contactInfo.phones.map((phone) => (
              <p key={phone} className="text-sm text-slate-700">
                Phone: {phone}
              </p>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-700">Email: {contactInfo.email}</p>
          <p className="mt-2 text-sm text-slate-700">{contactInfo.address}</p>
          <p className="mt-2 text-sm text-slate-700">{contactInfo.hours}</p>
        </div>
      </Container>
    </footer>
  );
}
