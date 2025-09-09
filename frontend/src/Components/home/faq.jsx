import React, { useState } from 'react';

const ShoeStoreFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  const faqData = [
    {
      question: "What types of shoes do you sell?",
      answer: "We offer a wide variety of shoes including casual sneakers, formal dress shoes, athletic footwear, boots, sandals, and specialty shoes for various occasions. Our collection features top brands and styles for men, women, and children."
    },
    {
      question: "How do I find the right shoe size?",
      answer: "We provide a detailed size guide on each product page. We recommend measuring your feet in the evening when they're slightly swollen for the most accurate fit. If you're between sizes, we suggest going up half a size for comfort."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a 30-day return policy for unworn shoes in original packaging. Exchanges are free within this period. If the shoes don't fit properly or you're not satisfied, simply contact our customer service team to initiate a return."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on orders over $75. For orders under $75, shipping costs $8.99. We also provide expedited shipping options at checkout for faster delivery."
    },
    {
      question: "How can I care for my shoes to make them last longer?",
      answer: "Proper shoe care varies by material. For leather shoes, use appropriate conditioners and polish regularly. For sneakers, clean with mild soap and water. Always allow shoes to dry completely between wears and use shoe trees to maintain shape."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates vary by destination and are calculated at checkout. Delivery times typically range from 7-21 business days depending on your location. Please note that customs duties and taxes may apply."
    }
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mt-4">
            Everything you need to know about our shoes and services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-[#ffcecad6] ${
                activeAccordion === index ? 'bg-[#ffcecad6]' : ''
              }`}
            >
              <button
                className={`accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-[#e75c3a] ${
                  activeAccordion === index ? 'font-medium text-[#e75c3a]' : ''
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeAccordion === index}
              >
                <h5 className="text-lg">{faq.question}</h5>
                <svg
                  className={`text-gray-500 transition duration-500 group-hover:text-[#e75c3a] flex-shrink-0 ml-4 ${
                    activeAccordion === index ? 'text-[#e75c3a] rotate-180' : ''
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`accordion-content w-full px-0 overflow-hidden transition-all duration-500 ${
                  activeAccordion === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-base text-gray-700 leading-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShoeStoreFAQ;