import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

const HeroSection = () => (
  <section
    className="text-center my-16 min-h-[90dvh] flex flex-col justify-center items-center bg-cover bg-center relative px-4"
    style={{ backgroundImage: `url('/assets/images/hero.webp')` }}
  >
    <div className="absolute inset-0 bg-black opacity-60" />
    <div className="relative z-10">
      <h1 className="text-7xl font-bold mb-4 text-white font-mono drop-shadow-lg">Xtracker</h1>
      <p className="text-xl mb-8 text-white drop-shadow-lg">
        Your AI-Powered Personal Finance Assistant
      </p>
      <Button
        className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        size="lg"
      >
        Get Started <ArrowRight aria-hidden className="ml-2" />
      </Button>
    </div>
  </section>
);

export default HeroSection;
