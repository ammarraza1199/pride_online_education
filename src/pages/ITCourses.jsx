import React from 'react';
import CourseCard from '../components/CourseCard';
import { motion } from 'framer-motion';

const ITCourses = () => {
  const itCourses = [
    { title: "Back Office", description: "Learn essential back office skills and management.", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Digital Designing", description: "Master graphic design, UI/UX, and visual communication.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "CAD Careers", description: "AutoCAD and 3D modeling for engineering and architecture.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Software Developer", description: "Learn programming languages and software engineering.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Digital Marketing", description: "SEO, SEM, Social Media, and digital advertising strategies.", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Animation", description: "2D and 3D animation techniques and software.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "VFX", description: "Visual effects for film, television, and gaming.", image: "https://images.unsplash.com/photo-1535016120720-40c746a6580c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Office Assistance", description: "This course covers various attributes required for an", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Front office courses", description: "This is Pride Online Education flagship course with high quality", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "C & C++ Programming", description: "C is a widely used and user-friendly programming", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "DBMS", description: "This course provides a comprehensive introduction", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "PHP", description: "This course provides an in-depth exploration of PHP,", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Python Programming", description: "Learn the fundamentals of Python for data science", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

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
      {/* Page Header */}
      <div className="bg-primary-blue text-white py-[60px] text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-[42px] font-bold mb-[10px]">IT course</h1>
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
            Information Technology Course
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={staggerContainer}
            className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[30px]"
          >
            {itCourses.map((course, index) => (
              <motion.div variants={fadeInUp} key={index}>
                <CourseCard title={course.title} description={course.description} image={course.image} />
              </motion.div>
            ))}
          </motion.div>
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
