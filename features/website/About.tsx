import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

const AboutSection = () => (
  <section className="text-center mb-16 container mx-auto px-4" id="about">
    <h2 className="text-3xl font-bold mb-4 text-indigo-600">Take Control of Your Finances Today</h2>
    <p className="text-xl mb-8 text-gray-600">
      Join thousands of users who have transformed their financial lives with Xtracker.
    </p>
    <Button
      className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      size="lg"
    >
      Start Your Financial Journey <ArrowRight className="ml-2" />
    </Button>
  </section>
);

export default AboutSection;
