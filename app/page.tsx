import React from "react";
import { ArrowRight, PiggyBank, TrendingUp, Shield, Target, Zap, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-50 to-gray-200 text-gray-800">
      <header>
        <Navbar />
      </header>
      <main>
        <section
          className="text-center mb-16 min-h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
          style={{ backgroundImage: `url('/assets/images/hero.webp')` }}
        >
          {/* <h1 className="text-5xl font-bold mb-4 text-indigo-600 font-mono">Xtracker</h1>
          <p className="text-xl mb-8 text-gray-600">Your AI-Powered Personal Finance Assistant</p>
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            size="lg"
          >
            Get Started <ArrowRight aria-hidden className="ml-2" />
          </Button>
        </section> */}
          <div className="absolute inset-0 bg-black opacity-60" />

          <div className="relative z-10 p-8">
            {/* <h1 className="text-5xl font-bold mb-4 text-white font-mono drop-shadow-lg">
              Xtracker
            </h1>
            <p className="text-xl mb-8 text-white drop-shadow-lg">
              Your AI-Powered Personal Finance Assistant
            </p> */}
            <h1 className="text-5xl font-bold mb-4 text-indigo-600 font-mono">Xtracker</h1>
            <p className="text-xl mb-8 text-white drop-shadow-lg">
              Your AI-Powered Personal Finance Assistant
            </p>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              size="lg"
            >
              Get Started <ArrowRight aria-hidden className="ml-2" />
            </Button>
          </div>
        </section>

        <section
          className="container mx-auto grid md:grid-cols-3 gap-8 mb-16 scroll-m-10"
          id="features"
        >
          <FeatureCard
            description="AI-driven insights to help you save more and spend wisely."
            icon={<PiggyBank aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Smart Budgeting"
          />
          <FeatureCard
            description="Easily categorize and visualize your spending habits."
            icon={<TrendingUp aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Expense Tracking"
          />
          <FeatureCard
            description="Bank-level encryption to keep your data safe and secure."
            icon={<Shield aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Financial Security"
          />
          <FeatureCard
            description="Set and track financial goals with personalized milestones."
            icon={<Target aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Goal Setting"
          />
          <FeatureCard
            description="Never miss a payment with smart bill tracking and reminders."
            icon={<Zap aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Bill Reminders"
          />
          <FeatureCard
            description="Access your finances on-the-go with our user-friendly mobile app."
            icon={<Smartphone aria-hidden className="w-12 h-12 mb-4 text-indigo-500" />}
            title="Mobile App"
          />
        </section>

        <section className="text-center mb-16 container mx-auto" id="about">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Take Control of Your Finances Today
          </h2>
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
      </main>
      <footer className="text-center text-sm text-gray-600 font-mono py-16 container mx-auto">
        © 2024 Xtracker. All rights reserved.
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
