import { Shield, Lock, Eye, Server } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Your data is securely encrypted both in transit and at rest. Only you have access to your information, ensuring complete confidentiality.",
  },

  {
    icon: Lock,
    title: "Extra-Secure Login",
    description:
      "We add an extra layer of protection to make sure only you can access your account.",
  },
  {
    icon: Eye,
    title: "Your Data, Your Privacy",
    description:
      "We prioritize your privacy. Your information is kept confidential and will never be shared with third parties. It is solely utilized to enhance your experience with XTracker.",
  },
  {
    icon: Server,
    title: "Ongoing Security Checks",
    description: "We constantly update our security and run audits to stay ahead of threats.",
  },
];

export default function Security() {
  return (
    <section className="pt-8 mb-16 bg-gray-50 scroll-m-10" id="why">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl text-primary font-mono font-bold text-center mb-4">
          🔒 Why XTracker is Secure
        </h2>
        <p className="text-center text-xl text-neutral-950 mb-8 max-w-2xl mx-auto">
          We know how important security and privacy are when it comes to your money. That’s why
          XTracker is built with top-tier security measures so you can track your expenses
          worry-free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            <strong className="text-primary text-xl">🏦 No Need to Link Your Bank</strong> <br />
            Unlike other finance apps, XTracker doesn’t ask for direct access to your bank accounts
            keeping things extra secure.
          </p>
          {/* <a
            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
            href="#"
          >
            Learn more about our security measures
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </a> */}
        </div>
      </div>
    </section>
  );
}
