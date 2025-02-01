import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const plans = [
  {
    name: "Basic",
    price: "₦4,000",
    description: "Perfect for personal users to start tracking expenses",
    features: [
      "Manual Expense Entry",
      "Basic Expense Categorization",
      "Spending Insights (Basic)",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "₦10,000",
    description: "Ideal for users who need more detailed insights and control",
    features: [
      "Unlimited Expense Entries",
      "Advanced Expense Categorization",
      "Detailed Analytics & Reports",
      "Custom Budgeting Tools",
      "Ad-Free Experience",
      "Priority Email Support",
    ],
  },
  {
    name: "Business",
    price: "₦25,000",
    description: "Designed for teams and businesses to manage finances together",
    features: [
      "Multi-User Collaboration",
      "Expense Approval Workflow",
      "Customizable Reporting",
      "Advanced Budgeting & Forecasting",
      "Team Access Management",
      "Dedicated Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
