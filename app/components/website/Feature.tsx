// import {
//   PieChart,
//   FileText,
//   PiggyBank,
//   Target,
//   Calendar,
//   Smartphone,
//   Shield,
//   Globe,
// } from "lucide-react";

// const FeaturesSection = () => {
//   const categories = [
//     {
//       category: "Track & Analyze",
//       features: [
//         {
//           title: "Expense Tracking",
//           description: "See where your money goes and take control of your spending.",
//           icon: PieChart,
//         },
//         {
//           title: "Reports & Insights",
//           description: "Generate reports to analyze spending over weeks, months, or years.",
//           icon: FileText,
//         },
//       ],
//     },
//     {
//       category: "Plan & Save",
//       features: [
//         {
//           title: "Smart Budgeting",
//           description: "AI-driven insights to help you save smarter and spend wisely.",
//           icon: PiggyBank,
//         },
//         {
//           title: "Achieve Financial Milestones",
//           description: "Set your goals, track your progress, and celebrate financial wins.",
//           icon: Target,
//         },
//       ],
//     },
//     {
//       category: "Stay Organized",
//       features: [
//         {
//           title: "Bill Reminders",
//           description: "Never miss a bill again with timely reminders.",
//           icon: Calendar,
//         },
//         {
//           title: "Mobile App",
//           description: "Manage your finances anytime, anywhere with our on-the-go mobile app.",
//           icon: Smartphone,
//         },
//       ],
//     },
//     {
//       category: "Secure & Easy",
//       features: [
//         {
//           title: "Financial Security",
//           description: "Enjoy bank-level encryption to keep your data safe and secure.",
//           icon: Shield,
//         },
//         {
//           title: "Multi-Currency Support",
//           description: "Track expenses in different currencies with real-time conversions.",
//           icon: Globe,
//         },
//       ],
//     },
//   ];

//   return (
//     <section className="max-w-5xl mx-auto px-4 py-12 scroll-m-10" id="features">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-primary mb-4 font-mono">Key Features</h2>
//         <p className="text-neutral-950 text-lg">
//           Discover how XTracker helps you manage your finances smarter and easier.
//         </p>
//       </div>

//       {/* Categories */}
//       {categories.map((category, idx) => (
//         <div key={idx} className="mb-12">
//           <h3 className="text-2xl font-semibold text-primary mb-6 font-mono">
//             {category.category}
//           </h3>
//           <div className="grid md:grid-cols-2 gap-5">
//             {category.features.map((feature, featureIdx) => (
//               <FeatureCard
//                 key={featureIdx}
//                 description={feature.description}
//                 icon={feature.icon}
//                 title={feature.title}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// interface FeatureCardProps {
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
//     <Icon aria-hidden className="w-12 h-12 mb-4 text-primary" />
//     <h4 className="text-xl font-semibold mb-2 text-primary font-mono tracking-tight">{title}</h4>
//     <p className="text-neutral-950">{description}</p>
//   </div>
// );

// export default FeaturesSection;

import { LineChart, Tag, PiggyBank, Bell, Globe, Smartphone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Easily log your daily expenses with name, amount, and date. See where your money goes and take control of your spending.",
    icon: LineChart,
    color: "text-blue-500",
  },
  {
    title: "Budget Goals & Alerts",
    description:
      "Set budget limits for different categories and receive notifications when you're approaching your limits.",
    icon: PiggyBank,
    color: "text-green-500",
  },
  {
    title: "Wishlist Management",
    description:
      "Keep track of items you want to purchase, including price, quantity, and notes. Plan your future expenses.",
    icon: Bell,
    color: "text-red-500",
  },
  {
    title: "Smart Budgeting",
    description:
      "AI-driven insights to help you save smarter and spend wisely. Financial planning made easy.",
    icon: Tag,
    color: "text-purple-500",
  },
  {
    title: "Multi-Currency Support",
    description:
      "Handle expenses in multiple currencies, perfect for travelers or managing international purchases.",
    icon: Globe,
    color: "text-orange-500",
  },
  // {
  //   title: "Offline-First",
  //   description:
  //     "Access and update your expenses anytime, even without an internet connection. Sync across devices when online.",
  //   icon: Smartphone,
  //   color: "text-indigo-500",
  // },
  {
    title: "Bill Reminders",
    description:
      "Never miss a payment with timely bill reminders. Set up recurring reminders for your bills.",
    icon: Smartphone,
    color: "text-indigo-500",
  },
];

export default function Features() {
  return (
    <section className="py-20" id="features">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-mono text-primary">Key Features</h2>
          <p className="max-w-2xl mx-auto text-xl mb-8 text-neutral-950">
            Discover how XTracker helps you manage your expenses smarter and easier, without
            connecting to your bank accounts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-purple-500 transition-all hover:shadow-xl duration-300"
            >
              <CardHeader>
                <feature.icon className={`w-12 h-12 text-primary mb-4`} />
                <CardTitle className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
