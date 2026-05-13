import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy practices and data handling overview for Align Care Dental Lab website visitors.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
        <p className="mt-6 text-sm leading-7 text-slate-700">
          This website provides informational content about Align Care Dental Lab services. We do not collect sensitive
          medical information through this site in its current phase.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Basic analytics and technical logs may be processed by hosting and infrastructure providers for performance and
          security monitoring. This page should be reviewed by legal counsel before public launch.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          If policy terms are updated in future releases, the latest effective date and details will be published here.
        </p>
      </Container>
    </div>
  );
}
