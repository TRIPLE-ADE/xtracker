import { Globe, Lightbulb, Users } from "lucide-react";

const aboutCards = [
  {
    id: 1,
    title: "Our Mission",
    icon: <Lightbulb className="w-12 h-12 text-indigo-600" />,
    frontText: "Empowering individuals with smart tools to regain control of their finances.",
    backText:
      "To empower individuals with the tools they need to achieve financial well-being and success, one decision at a time.",
  },
  {
    id: 2,
    title: "Our Purpose",
    icon: <Globe className="w-12 h-12 text-indigo-600" />,
    frontText: "Simplifying personal finance with clarity and actionable insights.",
    backText:
      "To simplify the complex world of personal finance, offering clarity, confidence, and actionable insights for everyone.",
  },
  {
    id: 3,
    title: "Our Community",
    icon: <Users className="w-12 h-12 text-indigo-600" />,
    frontText: "Join a community taking control of their financial future with XTracker.",
    backText:
      "We are committed to helping users achieve financial wellness, whether they're managing everyday expenses or working towards life-changing goals.",
  },
];

const AboutSection = () => (
  <section className="py-16 scroll-m-10" id="about">
    <div className="container mx-auto px-4 text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 text-indigo-600 font-mono">About XTracker</h2>
      <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
        XTracker was built to help individuals regain control over their financial lives. We believe
        that financial management should be simple, intuitive, and tailored to fit every unique
        situation. XTracker empowers you to understand your spending, track your goals, and make
        informed decisions to secure your financial future.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {aboutCards.map((card) => (
          <div key={card.id} className="group min-h-80 [perspective:1000px]">
            <div className="relative transition-transform duration-700 bg-white rounded-lg shadow-xl w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Face */}
              <div className="absolute inset-0 h-full w-full px-12 [backface-visibility:hidden] rounded-lg flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-center">{card.frontText}</p>
              </div>
              {/* Back Face */}
              <div className="absolute inset-0 h-full w-full bg-indigo-100 rounded-lg px-12 text-center text-slate-200 flex flex-col justify-center items-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.backText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-lg mb-6 text-gray-600 max-w-2xl mx-auto">
          From daily expense tracking to long-term financial planning, XTracker is your partner in
          financial clarity. We are committed to helping users achieve financial wellness, whether
          they&apos;re managing everyday expenses or working towards life-changing goals.
        </p>
      </div>
    </div>
  </section>
);

export default AboutSection;
