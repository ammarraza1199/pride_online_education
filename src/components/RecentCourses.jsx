import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const RecentCourses = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'), limit(8));
        const querySnapshot = await getDocs(q);
        const fetchedCourses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching recent courses: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentCourses();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress || 0);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || loading || courses.length === 0) return;

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
  }, [loading, courses]);

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
          Our Recent Courses
        </motion.h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No recent courses found.</div>
        ) : (
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
              {courses.map((course) => (
                <Link to={`/${course.slug}`} key={course.id} className="min-w-[280px] sm:min-w-[320px] max-w-[350px] flex-shrink-0 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow snap-start no-underline block group">
                  {/* Image */}
                  <div className="w-full h-[250px] bg-[#d1d1d1] relative overflow-hidden group-hover:opacity-90 transition-opacity">
                    {course.image ? (
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    ) : (
                      <img src="/images/it_code_image.png" alt={course.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    )}
                    {/* Zigzag Overlap */}
                    <div className="absolute bottom-4 left-4 h-[6px] w-[56px] z-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='6' viewBox='0 0 14 6'%3E%3Cpath d='M0 5 L3.5 1 L7 5 L10.5 1 L14 5' fill='none' stroke='%23ef3239' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}></div>
                  </div>

                  {/* Content */}
                  <div className="p-[25px]">
                    <h3 className="text-[18px] font-bold text-[#111] font-['Poppins'] mb-[10px] group-hover:text-primary-red transition-colors">{course.title}</h3>
                    <p className="text-[#777] text-[14px] leading-[1.6] line-clamp-2">
                      {course.description || course.seoDescription}
                    </p>
                  </div>
                </Link>
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
        )}
      </div>
    </section>
  );
};

export default RecentCourses;
