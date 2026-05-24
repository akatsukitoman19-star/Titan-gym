export interface Program {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  tag?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  instagram: string;
  facebook: string;
  twitter: string;
  specialties: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  popular: boolean;
  features: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  transformationTag: string; // e.g. "Lost 15kg"
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TransformationItem {
  id: string;
  name: string;
  age: string;
  goal: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  achievement: string;
}
