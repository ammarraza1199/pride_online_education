import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RecentCourses = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const courses = [
    { title: "Office Assistance", desc: "This course covers various attributes required for an", image: "/images/course_mba.png" },
    { title: "Front office courses", desc: "This is Pride Online Education flagship course with high quality", image: "/images/course_mba.png" },
    { title: "C & C++ Programming", desc: "C is a widely used and user-friendly programming", image: "/images/it_code_image.png" },
    { title: "DBMS", desc: "This course provides a comprehensive introduction", image: "/images/it_data_image.png" },
    { title: "PHP", desc: "This course provides an in-depth exploration of PHP,", image: "/images/it_code_image.png" },
    { title: "Python Programming", desc: "Learn the fundamentals of Python for data science", image: "/images/it_code_image.png" },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress || 0);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
        // If at the end, scroll back to the beginning
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right to the next card (approx 345px)
        scrollContainer.scrollBy({ left: 345, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-[80px] bg-[#f9fafc] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[32px] md:text-[40px] text-[#222] font-extrabold text-center mb-[50px] font-['Poppins']"
        >
          Our Recent Course
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-[25px] overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course, idx) => (
              <div key={idx} className="min-w-[280px] sm:min-w-[320px] max-w-[350px] flex-shrink-0 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow snap-start">
                {/* Image */}
                <div className="w-full h-[250px] bg-[#d1d1d1] relative overflow-hidden group-hover:opacity-90 transition-opacity">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#a8a8a8] font-bold text-[24px]">352x333</span>
                    </div>
                  )}
                  {/* Zigzag Overlap */}
                  <div className="absolute bottom-4 left-4 h-[6px] w-[56px] z-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='6' viewBox='0 0 14 6'%3E%3Cpath d='M0 5 L3.5 1 L7 5 L10.5 1 L14 5' fill='none' stroke='%23ef3239' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}></div>
                </div>

                {/* Content */}
                <div className="p-[25px]">
                  <h3 className="text-[18px] font-bold text-[#111] font-['Poppins'] mb-[10px]">{course.title}</h3>
                  <p className="text-[#777] text-[14px] leading-[1.6]">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Custom scroll progress indicator */}
          <div className="flex justify-center mt-4 gap-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-600 rounded-full transition-all duration-150"
                style={{ width: '40%', transform: `translateX(${scrollProgress * 150}%)` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentCourses;
