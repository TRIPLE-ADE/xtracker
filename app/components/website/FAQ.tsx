import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

const faqs = [
  {
    question: "Do I need to connect my bank account to use XTracker?",
    answer:
      "No, XTracker doesn't require you to connect your bank account. You can manually input your expenses and manage your finances without sharing sensitive banking information.",
  },
  {
    question: "How does XTracker's AI categorization work?",
    answer:
      "XTracker uses machine learning algorithms to suggest categories based on the expense name and your past categorization patterns. The AI learns from your inputs and gets smarter over time.",
  },
  {
    question: "Can I use XTracker offline?",
    answer:
      "Yes, XTracker is designed with an offline-first approach. You can log expenses and access your data without an internet connection. Your data will sync across devices when you're back online.",
  },
  {
    question: "How does multi-currency support work?",
    answer:
      "XTracker allows you to log expenses in different currencies. You can set a base currency and the app will convert other currencies using up-to-date exchange rates when you're online.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, XTracker uses advanced encryption to protect your data both on your device and during syncing. We use Supabase for secure authentication and don't store any of your financial institution credentials.",
  },
];

export default function FAQ() {
  return (
    <section className="pt-8 scroll-m-10 mb-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-primary font-mono">
          Frequently Asked Questions
        </h2>
        <p className="text-center mb-12 text-xl text-neutral-950 max-w-2xl mx-auto">
          Find answers to common questions about XTracker and how it can help you manage your
          expenses.
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion collapsible className="w-full" type="single">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
