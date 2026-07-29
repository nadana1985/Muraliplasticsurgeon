// Shared TypeScript Interfaces for Dr. Murali. K Website

// ===== Component Props Interfaces =====

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ===== Domain Data Model Interfaces =====

export interface Doctor {
  name: string;
  title: string;
  experience: string;
  languages: string[];
  specializations: string[];
  bio: string;
  education: Education[];
}

export interface Education {
  degree: string;
  institution: string;
  year?: number | null;
}

export interface Clinic {
  name: string;
  address: Address;
  phone: string;
  phoneFormatted: string;
  googleMapsQuery: string;
}

export interface Address {
  line1: string;
  landmark?: string;
  area?: string;
  city: string;
  pincode: string;
  state?: string;
  country?: string;
  full: string;
}

export interface Service {
  name: string;
  category: ServiceCategory;
  description?: string;
}

export type ServiceCategory = 
  | 'Face' 
  | 'Body' 
  | 'Breast' 
  | 'Hair' 
  | 'Male' 
  | 'Skin' 
  | 'Intimate';

export interface Testimonial {
  author: string;
  quote: string;
  rating: number;
  procedure?: string;
  verified?: boolean;
  date?: string;
  avatar?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

// ===== Site Configuration =====

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  locale: string;
  themeColor: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
  };
}

export interface SocialConfig {
  phone: string;
  whatsapp: string;
}

export interface SiteMetadata {
  site: SiteConfig;
  doctor: Doctor;
  clinic: Clinic;
  navigation: {
    main: NavigationItem[];
    footer: {
      services: NavigationItem[];
      quick_links: NavigationItem[];
    };
  };
  seo: SEOConfig;
  social: SocialConfig;
  images: {
    logo: string;
    hero: string;
    ogImage: string;
  };
}

// ===== Gallery =====

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ===== Contact Form =====

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

// ===== Common Utility Types =====

export type ResponsiveValue<T> = T | { sm?: T; md?: T; lg?: T; xl?: T };

export type WithChildren<T = {}> = T & { children: React.ReactNode };

export type WithClassName<T = {}> = T & { className?: string };