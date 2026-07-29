import Hero from "@/components/sections/Hero";
import StatsCounter from "@/components/sections/StatsCounter";
import AboutDoctor from "@/components/sections/AboutDoctor";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TrustBar from "@/components/sections/TrustBar";
import ValueProps from "@/components/sections/ValueProps";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactSection from "@/components/sections/ContactSection";
import ClinicGallery from "@/components/sections/ClinicGallery";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd page="home" />
      <Hero />
      <AnimatedSection>
        <TrustBar />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <StatsCounter />
      </AnimatedSection>
      <AnimatedSection>
        <AboutDoctor />
      </AnimatedSection>
      <AnimatedSection>
        <ValueProps />
      </AnimatedSection>
      <AnimatedSection>
        <ServicesShowcase />
      </AnimatedSection>
      <AnimatedSection>
        <ClinicGallery />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
      <AnimatedSection>
        <BlogPreview />
      </AnimatedSection>
      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>
    </>
  );
}
