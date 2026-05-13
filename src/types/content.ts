export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  outcomes: string[];
  images: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactInfo = {
  phones: string[];
  email: string;
  address: string;
  hours: string;
};

export type JourneyStep = {
  title: string;
  description: string;
  image: string;
};
