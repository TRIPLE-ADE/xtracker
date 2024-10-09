import { PiggyBank, TrendingUp, Shield, Target, Zap, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Budgeting",
      description: "AI-driven insights to help you save more.",
      icon: PiggyBank,
    },
    {
      title: "Expense Tracking",
      description: "Categorize and visualize spending.",
      icon: TrendingUp,
    },
    {
      title: "Financial Security",
      description: "Bank-level encryption for data safety.",
      icon: Shield,
    },
    { title: "Goal Setting", description: "Set and track financial milestones.", icon: Target },
    { title: "Bill Reminders", description: "Smart bill tracking and reminders.", icon: Zap },
    { title: "Mobile App", description: "Access finances on-the-go.", icon: Smartphone },
  ];

  return (
    <section className="container mx-auto px-4 grid md:grid-cols-3 gap-8 mb-16" id="features">
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          description={feature.description}
          icon={feature.icon}
          title={feature.title}
        />
      ))}
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <Icon aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />
    <h3 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeaturesSection;
