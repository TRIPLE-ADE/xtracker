"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

const HeroSection = () => {
  return (
    <section className="text-center mt-40 mb-8 flex flex-col justify-center items-center px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg text-secondary">
          Track Your Expenses <span className="text-primary">Like a Pro</span>
        </h1>
        <p className="text-xl mb-8">
          Say goodbye to financial stress! XTracker helps you track every penny, from everyday
          expenses to recurring bills, all in one place. Stay on top of your spending effortlessly
          with automated categorization and smart insights.
        </p>
        <Button
          asChild
          Icon={ArrowRight}
          className="mt-2 w-full max-w-sm"
          iconPlacement="right"
          size="lg"
          variant="expandIcon"
        >
          <Link href="/auth/signup">Get Started</Link>
        </Button>
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
