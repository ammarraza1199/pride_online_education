import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadButtons = () => {
  const handleClick = (type) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_click', {
        lead_type: type
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      <a 
        href="tel:+917760345397" 
        onClick={() => handleClick('phone')}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center" 
        aria-label="Call Now"
      >
        <Phone size={24} />
      </a>
      <a 
        href="https://wa.me/917760345397" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={() => handleClick('whatsapp')}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center" 
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <Link 
        to="/contact-us" 
        onClick={() => handleClick('enquire')}
        className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center" 
        aria-label="Enquire Now"
      >
        <FileText size={24} />
      </Link>
    </div>
  );
};

export default LeadButtons;
