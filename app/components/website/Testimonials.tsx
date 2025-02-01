import { Card, CardContent, CardFooter } from "@/shared/ui/card";

const testimonials = [
  {
    quote:
      "XTracker has completely transformed the way I manage my finances. With clear visualizations and smart budgeting, I'm finally in control of my spending!",
    author: "Amina Bello",
    company: "Freelance Designer",
  },
  {
    quote:
      "Thanks to XTracker, I've been able to set realistic budget goals and stick to them. The insights are incredibly helpful for making smarter financial decisions.",
    author: "Chijioke Obi",
    company: "Small Business Owner",
  },
  {
    quote:
      "As a team, XTracker has helped us keep track of all our expenses in one place. The collaborative features make budgeting and reporting a breeze.",
    author: "Micheal Johnson",
    company: "Marketing Agency Ltd.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white scroll-m-10" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-gray-600 italic mb-4">&quot;{testimonial.quote}&quot;</p>
              </CardContent>
              <CardFooter>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
