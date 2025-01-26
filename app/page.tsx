import dynamic from "next/dynamic";

import Footer from "@/layout/Footer";
import { AboutSection, FeaturesSection, HeroSection, InfoSection } from "@/app/website/components";
import Navbar from "@/layout/Header";

const Particles = dynamic(() => import("@/shared/custom/particles"));

const Home = () => {
  return (
    <div className="text-neutral-950">
      {/* <div className="bg-gradient-to-br from-slate-200 via-slate-50 to-gray-200 text-gray-800"> */}
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <InfoSection />
      </main>
      <Footer />
      <Particles refresh color={"#000"} ease={80} quantityDesktop={350} quantityMobile={100} />
    </div>
  );
};

export default Home;
