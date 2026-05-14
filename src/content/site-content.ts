import type { ContactInfo, FaqItem, JourneyStep, NavItem, Service } from "@/types/content";

const IMAGE_VERSION = "v6";
const versionedImage = (imagePath: string) => `${imagePath}?${IMAGE_VERSION}`;

export const brand = {
  name: "Kamfe Smile Care Lab",
  tagline: "Where experience meets technology for perfect smiles.",
  heroTitle: "Advanced Clear Aligner and Digital Dental Solutions",
  heroDescription:
    "Kamfe Smile Care Lab combines 25+ years of clinical-lab experience with modern digital workflows to deliver precise, comfortable, and reliable treatment outcomes.",
  heroImage: versionedImage("/images/services/clear-aligners/clear-aligners-workflow.jpeg"),
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Aligners", href: "/aligners" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    slug: "clear-aligners",
    name: "Clear Aligner Treatments",
    summary:
      "Custom aligner plans built on digital scans and staged biomechanics for predictable tooth movement.",
    longDescription:
      "Our clear aligner workflow is built for clinical predictability, from digital diagnosis to staged movement planning and refinement tracking. Each case receives structured planning support to improve treatment clarity for both clinicians and patients.",
    benefits: [
      "Improved treatment precision through digital planning",
      "Comfort-focused tray design for daily wear",
      "Structured follow-up plans for retention stability",
    ],
    process: [
      "Case intake and digital records review",
      "Treatment setup and staged movement planning",
      "Batch fabrication and quality checks",
      "Delivery support and refinement planning",
    ],
    outcomes: ["Predictable movement staging", "Reduced treatment surprises", "Better patient compliance visibility"],
    images: [
      versionedImage("/images/services/clear-aligners/clear-aligners-front.jpeg"),
      versionedImage("/images/services/clear-aligners/clear-aligners-three-quarter.jpeg"),
      versionedImage("/images/services/clear-aligners/clear-aligners-side.jpeg"),
      versionedImage("/images/services/clear-aligners/clear-aligners-closeup.jpeg"),
      versionedImage("/images/services/clear-aligners/clear-aligners-workflow.jpeg"),
    ],
  },
  {
    slug: "crowns-bridges",
    name: "Precision Crowns and Bridges",
    summary:
      "Aesthetic and functional restorations with accurate fit, strong materials, and reliable turnaround.",
    longDescription:
      "We design and fabricate crowns and bridges with high-margin accuracy and material-conscious workflows. The goal is to support aesthetics, durability, and efficient chairside placement with minimal adjustment cycles.",
    benefits: [
      "Natural morphology and shade matching support",
      "Fit-first fabrication standards to reduce chairside adjustments",
      "Durability-focused material selection",
    ],
    process: [
      "Impression or intraoral scan intake",
      "Digital design and margin refinement",
      "Material-specific production workflow",
      "Final verification before dispatch",
    ],
    outcomes: ["High-fit restorations", "Improved esthetic confidence", "Consistent turnaround quality"],
    images: [
      versionedImage("/images/services/crowns-bridges/crowns-bridges-front.jpeg"),
      versionedImage("/images/services/crowns-bridges/crowns-bridges-three-quarter.jpeg"),
      versionedImage("/images/services/crowns-bridges/crowns-bridges-side.jpeg"),
      versionedImage("/images/services/crowns-bridges/crowns-bridges-closeup.jpeg"),
      versionedImage("/images/services/crowns-bridges/crowns-bridges-workflow.jpeg"),
    ],
  },
  {
    slug: "digital-smile-design",
    name: "Digital Smile Design",
    summary:
      "Simulation-led smile planning that aligns aesthetics with occlusal function and patient goals.",
    longDescription:
      "Digital smile planning allows teams to visualize outcomes before execution. We combine facial references, scan data, and functional planning constraints to create treatment-aware design proposals that are easy to present and refine.",
    benefits: [
      "Visual treatment communication before execution",
      "Improved interdisciplinary treatment coordination",
      "Predictable smile architecture decisions",
    ],
    process: [
      "Photo and scan data collection",
      "Facial and dental proportion analysis",
      "Digital mockup review and revision",
      "Final design handoff to treatment workflow",
    ],
    outcomes: ["Stronger case acceptance support", "Faster approval cycles", "Clearer multidisciplinary communication"],
    images: [
      versionedImage("/images/services/digital-smile-design/digital-smile-design-front.jpeg"),
      versionedImage("/images/services/digital-smile-design/digital-smile-design-three-quarter.jpeg"),
      versionedImage("/images/services/digital-smile-design/digital-smile-design-side.jpeg"),
      versionedImage("/images/services/digital-smile-design/digital-smile-design-closeup.jpeg"),
      versionedImage("/images/services/digital-smile-design/digital-smile-design-workflow.jpeg"),
    ],
  },
  {
    slug: "dental-lab-services",
    name: "Comprehensive Dental Lab Services",
    summary:
      "Integrated laboratory workflows supporting restorative, orthodontic, and digital-first practices.",
    longDescription:
      "Our comprehensive lab services support clinics that need reliability across multiple treatment categories. We combine technical checks, milestone controls, and transparent communication to reduce remakes and improve continuity.",
    benefits: [
      "Consistent quality controls across all cases",
      "Collaborative support for complex treatment plans",
      "Scalable lab capacity for growing practices",
    ],
    process: [
      "Case qualification and requirement mapping",
      "Production scheduling and milestone tracking",
      "Technical review at key checkpoints",
      "Delivery validation and post-delivery support",
    ],
    outcomes: ["Cross-case consistency", "Lower remake risk", "Scalable support for growing clinics"],
    images: [
      versionedImage("/images/services/dental-lab-services/dental-lab-services-front.jpeg"),
      versionedImage("/images/services/dental-lab-services/dental-lab-services-three-quarter.jpeg"),
      versionedImage("/images/services/dental-lab-services/dental-lab-services-side.jpeg"),
      versionedImage("/images/services/dental-lab-services/dental-lab-services-closeup.jpeg"),
      versionedImage("/images/services/dental-lab-services/dental-lab-services-workflow.jpeg"),
    ],
  },
];

export const alignerFaqs: FaqItem[] = [
  {
    question: "What are clear aligners?",
    answer:
      "Clear aligners are custom, removable plastic trays worn in sequence to gradually move teeth into planned positions.",
  },
  {
    question: "Are aligners better than braces?",
    answer:
      "Neither is universally better. Aligner suitability depends on clinical complexity, goals, and provider assessment.",
  },
  {
    question: "How long does treatment usually take?",
    answer:
      "Timelines vary by case, but many mild to moderate cases are completed in 6 to 18 months with good compliance.",
  },
  {
    question: "Do I need retainers after aligners?",
    answer:
      "Yes. Retainers help maintain final tooth positions and are a standard part of long-term treatment stability.",
  },
];

export const contactInfo: ContactInfo = {
  phones: ["03004949488", "03219454412"],
  email: "Khurrammm4949@gmail.com",
  address: "5 Fane Road, near State Bank, Mall Road, Lahore",
  hours: "Mon-Sat: 9:00 AM - 7:00 PM",
};

export const trustPoints = [
  "25+ years of aligner and dental lab experience",
  "Digital-first treatment planning workflows",
  "Precision manufacturing and quality checks",
  "Clinical and lab collaboration for consistent outcomes",
];

export const companyStats = [
  { label: "Years of Experience", value: "25+" },
  { label: "Service Categories", value: "4" },
  { label: "Digital-First Workflow", value: "End-to-End" },
  { label: "Quality Review Checkpoints", value: "Multi-stage" },
];

export const alignerJourney: JourneyStep[] = [
  {
    title: "Clinical Assessment",
    description: "Records, scans, and goals are gathered to define treatment suitability and priorities.",
    image: versionedImage("/images/aligner-journey/clinical-assessment-alt.jpeg"),
  },
  {
    title: "Digital Treatment Planning",
    description: "Biomechanics and sequencing are planned digitally to align movement goals with realistic staging.",
    image: versionedImage("/images/aligner-journey/digital-treatment-planning-alt.jpeg"),
  },
  {
    title: "Fabrication and Delivery",
    description: "Aligners are fabricated under quality controls and delivered with wear protocol guidance.",
    image: versionedImage("/images/aligner-journey/fabrication-delivery-alt.jpeg"),
  },
  {
    title: "Monitoring and Retention",
    description: "Progress is reviewed and retention is planned to maintain final outcomes long term.",
    image: versionedImage("/images/aligner-journey/monitoring-retention-alt.jpeg"),
  },
];
