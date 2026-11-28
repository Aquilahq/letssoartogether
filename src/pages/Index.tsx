import InstitutionalServices from "../components/InstitutionalServices";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Brands from "../components/Brands";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import ProjectNotebook from "../components/ProjectNotebook";
import Perspective from "../components/Perspective";
import AboutFounder from "../components/AboutFounder";
import Footer from "../components/Footer";
import heroImage from "@/assets/hero-bg-panorama.jpg";
import desktopHeroImage from "@/assets/hero-bg-desktop.jpg";

const Index = () => {
  return (
    <div className="site-shell min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Navbar />
      <main id="main-content">
      <Hero heroImage={heroImage} desktopHeroImage={desktopHeroImage} />
      <InstitutionalServices />
      <Brands />
      <Services />
      <Portfolio />
      <Perspective />
      <AboutFounder />
      <ProjectNotebook />
      <Contact />
      <Footer />
      </main>
    </div>
  );
};

export default Index;
