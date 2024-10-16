import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

const InfoSection = () => (
  <section className="text-center mb-16 container mx-auto px-4" id="about">
    <h2 className="text-4xl font-bold mb-4 text-indigo-600 font-mono">
      Take Control of Your Financial Future with XTracker
    </h2>
    <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
      Join a growing community of savvy users who have transformed their financial lives. With our
      smart budgeting tools, you&apos;ll always be on track. Whether you&apos;re planning for the
      future or managing day-to-day expenses, XTracker provides the clarity you need.
    </p>
    <Button
      className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      size="lg"
    >
      Start Your Financial Journey <ArrowRight className="ml-2" />
    </Button>
  </section>
);

export default InfoSection;
