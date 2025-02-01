import {
  Header,
  Footer,
  FeaturesSection,
  HeroSection,
  FAQ,
  HowItWorks,
  Security,
} from "@/app/components/website";

const Home = () => {
  return (
    <div className="text-neutral-950">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Security />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
