import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-[80px] bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-[32px] font-bold text-center mb-[50px] text-[#0b1c3c]">Student Testimonials</h2>
        
        <div className="relative max-w-4xl mx-auto px-10">
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-[-10px] md:left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full text-primary-blue hover:text-primary-red transition-colors focus:outline-none"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-[-10px] md:right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full text-primary-blue hover:text-primary-red transition-colors focus:outline-none"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Track */}
          <div className="relative min-h-[350px] sm:min-h-[300px] md:min-h-[250px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white p-[25px] md:p-[40px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col items-center text-center justify-center overflow-y-auto hide-scrollbar"
              >
                <div className="text-yellow-400 mb-[20px] flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mx-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="text-[#555] italic mb-[30px] text-[18px] md:text-[22px] font-light leading-relaxed">"{reviews[currentIndex].text || reviews[currentIndex].testimonial}"</p>
                <div className="mt-auto">
                  <h4 className="font-bold text-[#0b1c3c] text-[20px] mb-1">{reviews[currentIndex].name}</h4>
                  <p className="text-[16px] text-[#e63946] font-medium">{reviews[currentIndex].role || reviews[currentIndex].course}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8 relative z-10">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none ${idx === currentIndex ? 'bg-primary-red scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
