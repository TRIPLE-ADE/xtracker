import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui";

const steps = [
  {
    title: "Sign Up Securely",
    description: "Create your account with our secure authentication system.",
  },
  {
    title: "Log Your Expenses",
    description: "Easily input your daily expenses, including name, amount, and date.",
  },
  {
    title: "Categorize and Organize",
    description: "Use predefined categories or create custom ones to organize your spending.",
  },
  {
    title: "Set Budget Goals",
    description:
      "Define budget limits for different categories and receive alerts as you approach them.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="pt-8 mb-16 bg-white  px-4 flex flex-col justify-center items-center scroll-m-10"
      id="about"
    >
      <div className="max-w-6xl mx-auto mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-mono font-bold mb-4 text-primary">How XTracker Works</h2>
          <p className="max-w-2xl mx-auto text-xl mb-8 text-neutral-950">
            Get started with XTracker in four simple steps and take control of your expenses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                  <span className="text-purple-600 font-bold">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block w-full h-0.5 bg-purple-100" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
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
}
