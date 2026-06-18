import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Presentation } from '@/components/sections/Presentation';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTAFinal } from '@/components/sections/CTAFinal';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Presentation />
        <ServiceCards />
        <Testimonials />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
