import { Navbar }         from "@/components/layout/Navbar";
import { Footer }         from "@/components/layout/Footer";
import { HeroSection }    from "@/components/sections/HeroSection";
import { SocialProof }    from "@/components/sections/SocialProof";
import { DppShowcase }    from "@/components/sections/DppShowcase";
import { RoleDemo }       from "@/components/sections/RoleDemo";
import { DppDemo }        from "@/components/sections/DppDemo";
import { RoiMetrics }     from "@/components/sections/RoiMetrics";
import { Features }       from "@/components/sections/Features";
import { EpdPipeline }    from "@/components/sections/EpdPipeline";
import { HowItWorks }     from "@/components/sections/HowItWorks";
import { Integrations }   from "@/components/sections/Integrations";
import { Industries }     from "@/components/sections/Industries";
import { CaseStudies }    from "@/components/sections/CaseStudies";
import { RegulatoryDeadlines } from "@/components/sections/RegulatoryDeadlines";
import { RoiCalculator }  from "@/components/sections/RoiCalculator";
import { CtaBanner }      from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <DppShowcase />
        <RoleDemo />
        <DppDemo />
        <RoiMetrics />
        <Features />
        <EpdPipeline />
        <HowItWorks />
        <Integrations />
        <Industries />
        <CaseStudies />
        <RegulatoryDeadlines />
        <RoiCalculator />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
