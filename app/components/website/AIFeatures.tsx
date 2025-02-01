import Image from "next/image";

import { Card, CardContent } from "@/shared/ui/card";

export default function AIFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Financial Intelligence</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of artificial intelligence in managing your expenses.
            XTracker&apos;s smart features help you make better financial decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Smart Categorization</h3>
                <p className="text-gray-600">
                  Our AI suggests categories for your expenses based on your spending patterns,
                  making it easier to organize your finances.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-gray-600">
                  Get insights into future expenses and receive personalized recommendations to
                  optimize your spending.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Budget Recommendations</h3>
                <p className="text-gray-600">
                  Receive AI-powered suggestions for budget allocations based on your spending
                  history and financial goals.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg blur-2xl opacity-20" />
            <Image
              alt="AI Features Visualization"
              className="relative rounded-lg shadow-lg"
              height={600}
              src="/placeholder.svg?height=600&width=600"
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
