"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

const HeroSection = () => {
  return (
    <section className="text-center pt-40 mb-8 flex flex-col justify-center items-center px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg text-secondary">
          Track Your Expenses <span className="text-primary">Like a Pro</span>
        </h1>
        <p className="text-xl mb-8 text-neutral-950">
          Say goodbye to financial stress! XTracker helps you track every penny, from everyday
          expenses to recurring bills, all in one place. Stay on top of your spending effortlessly
          with automated categorization and smart insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>
      <Image
        alt="Illustration of Xtacker application dashboard"
        className="mt-12"
        height={600}
        loading="lazy"
        src="/assets/images/demo.png"
        width={800}
      />
    </section>
  );
};

export default HeroSection;
