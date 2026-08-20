import React, { useState } from 'react';
import Schema from './Schema';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      <Schema type="FAQPage" data={faqSchema} />
      <h2 className="text-[32px] font-bold text-center mb-[40px] text-[#0b1c3c]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-[8px] shadow-sm overflow-hidden">
            <button 
              onClick={() => toggle(index)}
              className="w-full text-left p-[20px] flex justify-between items-center bg-[#fcfcfc] hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-[18px] text-[#0b1c3c]">{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} className="text-[#e63946]" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>
            {openIndex === index && (
              <div className="p-[20px] bg-white border-t border-gray-100 text-[#666] leading-[1.6]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
