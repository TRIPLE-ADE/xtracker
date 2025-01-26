import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

const InfoSection = () => (
  <section className="text-center pt-8 mb-16 container mx-auto px-4" id="about">
    <h2 className="text-4xl font-bold mb-4 text-primary font-mono">
      Take Control of Your Financial Future with XTracker
    </h2>
    <p className="text-xl mb-8 text-neutral-950 max-w-2xl mx-auto">
      Join a growing community of savvy users who have transformed their financial lives. With our
      smart budgeting tools, you&apos;ll always be on track. Whether you&apos;re planning for the
      future or managing day-to-day expenses, XTracker provides the clarity you need.
    </p>
    <Button
      asChild
      Icon={ArrowRight}
      className="mt-2 w-full max-w-sm"
      iconPlacement="right"
      size="lg"
      variant="expandIcon"
    >
      <Link href="/auth/signup">Start Your Financial Journey</Link>
    </Button>
  </section>
);

export default InfoSection;
