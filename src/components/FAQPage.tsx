import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { faqData } from "../data/faq";

export function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products
            and services
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                >
                  {category.questions.map(
                    (item, questionIndex) => (
                      <AccordionItem
                        key={questionIndex}
                        value={`${categoryIndex}-${questionIndex}`}
                      >
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.answer,
                            }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact for More Info */}
        <div className="mt-12 bg-primary/5 rounded-lg p-6 text-center">
          <h3 className="text-lg mb-3 text-gray-900">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our technical support team is here to help with any
            additional questions about our products or
            applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@laserbiolabs.com"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Email Technical Support
            </a>
            <a
              href="mailto:sales@laserbiolabs.com"
              className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
            >
              Contact Sales Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}