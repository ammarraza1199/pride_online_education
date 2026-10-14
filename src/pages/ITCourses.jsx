import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getDefaultCoursesByCategory } from '../data/defaultCourses';

const ITCourses = () => {
  const [itCourses, setItCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), where('category', '==', 'IT'));
        const querySnapshot = await getDocs(q);
        const courses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (courses.length > 0) {
          setItCourses(courses);
        } else {
          setItCourses(getDefaultCoursesByCategory('IT'));
        }
      } catch (error) {
        console.warn("Could not fetch IT courses from Firestore (using fallback):", error?.message || error);
        setItCourses(getDefaultCoursesByCategory('IT'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full">
      <SEO 
        title="IT & Computer Courses - Pride Online Education" 
        description="Explore our industry-recognized IT and Computer certification courses designed to boost your tech career in Belagavi."
        url="/it-courses"
      />
      {/* Page Header */}
      <div className="bg-primary-blue text-white py-[60px] text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-[42px] font-bold mb-[10px]">IT Courses</h1>
          <div className="text-[14px] text-[#ccc]">Home / IT course</div>
        </motion.div>
      </div>

      <section className="py-[80px]">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] text-primary-blue font-bold mb-[40px] text-center"
          >
            Information Technology Courses
          </motion.h2>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={staggerContainer}
              className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[30px]"
            >
              {itCourses.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No IT courses found.</div>
              ) : (
                itCourses.map((course) => (
                  <motion.div variants={fadeInUp} key={course.id}>
                    <CourseCard 
                      title={course.title} 
                      description={course.description || course.seoDescription} 
                      image={course.image || '/images/it_code_image.png'} 
                      to={course.to || (course.slug ? `/${course.slug}` : '/it-courses')} 
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-[80px] bg-[#f9fafc] overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-[50px] items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex-1"
          >
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[36px] text-[#222] font-bold mb-[30px] font-['Poppins']">Why Choose Pride Online Education?</motion.h2>
            
            <ul className="flex flex-col gap-[15px] list-none p-0 m-0 mb-[30px]">
              {[
                'UGC-Recognised Degrees',
                'Flexible Learning Options',
                'Dedicated Academic Support',
                'Affordable Fee Structure',
                'Career Guidance & Placement Assistance'
              ].map((item, index) => (
                <motion.li variants={fadeInLeft} key={index} className="flex items-center gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#888] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[#666] text-[15px] font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeInUp} className="mt-[20px]">
              <h3 className="text-[18px] font-bold text-[#222] mb-[10px] font-['Poppins']">Start Your Journey Today!</h3>
              <p className="text-[#222] text-[16px] font-medium m-0">Ready to take the first step toward a successful academic career?</p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <motion.img 
              variants={fadeInRight}
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Growth Chart" 
              className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-lg" 
            />
          </motion.div>
          
        </div>
      </section>
    </div>
  );
};

export default ITCourses;
