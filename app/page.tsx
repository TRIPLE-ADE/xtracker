import Footer from "@/layout/Footer";
import { AboutSection, FeaturesSection, HeroSection } from "@features/website";
import Navbar from "@/layout/Header";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-200 via-slate-50 to-gray-200 text-gray-800">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
