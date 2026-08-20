import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone, Mail, Menu, X } from 'lucide-react';
import CourseEnquireModal from './CourseEnquireModal';

const LogoIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ marginRight: '16px' }}>
    <path d="M 35 45 C 15 45 20 65 25 75 L 35 90 L 40 70 C 45 55 45 45 35 45 Z" fill="#999" />
    <path d="M 65 45 C 85 45 80 65 75 75 L 65 90 L 60 70 C 55 55 55 45 65 45 Z" fill="#999" />
    <path d="M 35 60 C 45 80 55 80 65 60 L 50 95 Z" fill="#0B1D52" />
    <path d="M 50 20 L 15 35 L 50 50 L 85 35 Z" fill="#0B1D52" />
    <path d="M 35 45 Q 50 55 65 45 L 60 55 Q 50 65 40 55 Z" fill="#0B1D52" />
    <path d="M 22 35 L 22 55" stroke="#0B1D52" strokeWidth="2" />
    <circle cx="22" cy="57" r="2.5" fill="#0B1D52" />
  </svg>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The top bar is 70px high.
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`w-full font-['Poppins',sans-serif] antialiased z-[1000] ${isSticky ? 'fixed top-0 shadow-md' : 'relative'}`} style={{ transition: 'all 0.3s ease' }}>
        {/* Top Information Bar */}
        <div className={`hidden lg:flex w-full bg-[#FFFFFF] justify-between items-center transition-all duration-300 overflow-hidden ${isSticky ? 'h-0 opacity-0' : 'h-[70px] opacity-100'}`}>
          {/* Left Blue Section */}
          <div 
            className="h-full bg-[#0B1D52] flex items-center pl-[50px]"
            style={{ 
              width: '40%',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 35px) 100%, 0 100%)'
            }}
          >
            <div className="flex items-center h-full">
              {/* Phone Info */}
              <div className="flex items-center">
                <Phone size={22} color="#FFFFFF" />
                <span className="text-[#FFFFFF] font-semibold text-[15px] ml-[8px] leading-none whitespace-nowrap">
                  +91 7760345397
                </span>
              </div>
              
              {/* Spacer */}
              <div className="w-[20px]" />
              
              {/* Email Info */}
              <div className="flex items-center">
                <Mail size={22} color="#FFFFFF" />
                <span className="text-[#FFFFFF] font-semibold text-[15px] ml-[8px] leading-none whitespace-nowrap">
                  info@prideonlineeducation.com
                </span>
              </div>
            </div>
          </div>

          {/* Center-Right Business Hours and Button */}
          <div className="flex items-center h-full mr-[70px]">
            <span className="text-[#333333] font-semibold text-[18px] leading-none tracking-normal">
              Mon - Sat 9:00am - 6:00pm / Sunday - CLOSED
            </span>
            
            {/* Enquire Button */}
            <div className="ml-[70px] relative w-[150px] h-[54px]">
              {/* Shadow pseudo-element illusion */}
              <div className="absolute top-[6px] left-[6px] w-[150px] h-[54px] bg-[#0D1C4A]" />
              
              {/* Actual Button */}
              <button 
                onClick={() => setIsEnquireModalOpen(true)}
                className="absolute top-0 left-0 w-[150px] h-[54px] bg-[#142B63] text-white font-bold text-[18px] flex items-center justify-center transition-all duration-300 hover:brightness-110 cursor-pointer border-none rounded-none outline-none leading-none z-10"
              >
                Enquire
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="w-full h-[90px] lg:h-[110px] bg-[#FFFFFF] flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center ml-[20px] lg:ml-[40px]">
            <Link to="/" className="flex items-center w-auto h-[60px] lg:h-[72px] text-inherit no-underline">
              <LogoIcon className="w-[45px] h-[45px] lg:w-[72px] lg:h-[72px]" />
              <div className="flex flex-col justify-center leading-none mt-[4px]">
                <div className="flex items-center whitespace-nowrap">
                  <span className="text-[20px] sm:text-[28px] lg:text-[36px] font-light text-[#333333] tracking-[-0.5px]">Pride </span>
                  <span className="text-[20px] sm:text-[28px] lg:text-[36px] font-extrabold text-[#0B1D52] flex items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mx-[2px] -mt-[2px] lg:-mt-[4px] w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] lg:w-[22px] lg:h-[22px]">
                      <circle cx="12" cy="12" r="10" stroke="#E63946" strokeWidth="4" fill="none" />
                      <circle cx="12" cy="12" r="4" fill="#E63946" />
                    </svg>
                    nline Education
                  </span>
                </div>
                <span className="text-[12px] lg:text-[14px] text-[#333333] self-end mt-[2px] mr-[5px]">Your future!</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-start items-center ml-[110px] gap-[48px] pr-[60px]">
            {['Home', 'About Us', 'IT Courses', 'University Course', 'PG Course', 'Contact Us'].map((text, idx) => {
              const paths = ['/', '/about-us', '/it-courses', '/ug-course', '/pg-course', '/contact-us'];
              return (
                <NavLink 
                  key={idx} 
                  to={paths[idx]} 
                  className={({isActive}) => `text-[18px] transition-colors duration-300 no-underline whitespace-nowrap ${isActive ? 'text-[#0B2A6A] font-bold' : 'text-[#333333] font-semibold hover:text-[#0D2C74]'}`}
                >
                  {text}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-[#333333] bg-transparent border-none mr-[20px]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-t border-[#e5e7eb] shadow-lg flex flex-col py-4 px-6 z-50">
            {['Home', 'About Us', 'IT Courses', 'University Course', 'PG Course', 'Contact Us'].map((text, idx) => {
              const paths = ['/', '/about-us', '/it-courses', '/ug-course', '/pg-course', '/contact-us'];
              return (
                <NavLink 
                  key={idx} 
                  to={paths[idx]} 
                  className={({isActive}) => `text-[18px] py-3 border-b border-[#f0f0f0] no-underline ${isActive ? 'text-[#0B2A6A] font-bold' : 'text-[#333333] font-semibold'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text}
                </NavLink>
              );
            })}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-[14px]">
                <Phone size={24} color="#0B1D52" />
                <a href="tel:+917760345397" className="text-[#0B1D52] font-semibold text-[16px] no-underline">+91 7760345397</a>
              </div>
              <div className="flex items-center gap-[14px]">
                <Mail size={24} color="#0B1D52" />
                <a href="mailto:info@prideonlineeducation.com" className="text-[#0B1D52] font-semibold text-[16px] no-underline">info@prideonlineeducation.com</a>
              </div>
              <button 
                onClick={() => setIsEnquireModalOpen(true)}
                className="w-full h-[54px] mt-4 bg-[#142B63] text-white font-bold text-[18px] border-none shadow-[6px_6px_0px_#0D1C4A]"
              >
                Enquire
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Spacer to prevent layout jump when header becomes sticky */}
      {isSticky && <div className="h-[90px] lg:h-[110px] w-full block" />}
      
      {/* Enquire Modal */}
      <CourseEnquireModal 
        isOpen={isEnquireModalOpen} 
        onClose={() => setIsEnquireModalOpen(false)} 
      />
    </>
  );
};

export default Header;
