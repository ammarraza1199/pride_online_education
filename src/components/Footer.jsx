import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ChevronRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#22262a] text-[#999] pt-[60px]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row flex-wrap justify-between gap-[40px] pb-[40px]">
        <div className="flex-1 w-full md:w-auto min-w-[250px]">
          <Link to="/" className="flex items-center gap-[10px] mb-[20px]">
            <div className="logo-icon dark">
              <div style={{width: 40, height: 40, backgroundColor: '#0b1c3c', borderRadius: '5px'}}></div>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center">
                <span className="text-[26px] font-light text-white tracking-[-0.5px]">Pride&nbsp;</span>
                <span className="text-[26px] font-extrabold text-white flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="mx-[2px] -mt-[2px] w-[18px] h-[18px]">
                    <circle cx="12" cy="12" r="10" stroke="#E63946" strokeWidth="4" fill="none" />
                    <circle cx="12" cy="12" r="4" fill="#E63946" />
                  </svg>
                  nline Education
                </span>
              </div>
              <span className="text-[11px] text-[#999] self-end mt-[2px] mr-[5px]">Your future!</span>
            </div>
          </Link>
          <p className="leading-[1.8] mb-[15px] text-[14px]">
            1749/2D 3rd floor,<br/>
            Above SBI Bank Mujawar building<br/>
            kirloskar road belagavi
          </p>
          <div className="w-full max-w-[280px] h-[120px] mb-[20px] rounded overflow-hidden">
            <iframe 
              src="https://maps.google.com/maps?q=15.858985,74.509409&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex gap-[15px]">
            <a href="#" className="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#444] text-[#ccc] transition-all duration-300 hover:bg-primary-red hover:text-white hover:border-primary-red"><FacebookIcon /></a>
            <a href="#" className="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#444] text-[#ccc] transition-all duration-300 hover:bg-primary-red hover:text-white hover:border-primary-red"><TwitterIcon /></a>
            <a href="#" className="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#444] text-[#ccc] transition-all duration-300 hover:bg-primary-red hover:text-white hover:border-primary-red"><LinkedinIcon /></a>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto min-w-[250px] flex flex-col justify-center gap-[20px]">
          <div className="flex items-center gap-[15px] text-white text-[16px] font-medium">
            <Phone size={20} className="text-primary-red" />
            <span>+91 7760345397</span>
          </div>
          <div className="flex items-center gap-[15px] text-white text-[16px] font-medium">
            <Mail size={20} className="text-primary-red" />
            <span>info@prideonlineeducation.com</span>
          </div>
          <div className="flex items-center gap-[15px] text-white text-[16px] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-red">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto min-w-[250px] flex flex-col">
          <h4 className="text-white text-[20px] mb-[25px]">Useful Links</h4>
          <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
            <li><Link to="/contact-us" className="flex items-center gap-[5px] transition-colors duration-300 text-[14px] hover:text-primary-red"><ChevronRight size={14} /> Contact Us</Link></li>
            <li><Link to="/ug-course" className="flex items-center gap-[5px] transition-colors duration-300 text-[14px] hover:text-primary-red"><ChevronRight size={14} /> UG Course</Link></li>
            <li><Link to="/pg-course" className="flex items-center gap-[5px] transition-colors duration-300 text-[14px] hover:text-primary-red"><ChevronRight size={14} /> PG Course</Link></li>
            <li><Link to="/#faqs" className="flex items-center gap-[5px] transition-colors duration-300 text-[14px] hover:text-primary-red"><ChevronRight size={14} /> FAQs</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-[#333] py-[20px] text-center text-[14px]">
        <div className="container mx-auto px-4">
          <p>Pride Online Education. © 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
