import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UGCourse = () => {
  const [activeCourse, setActiveCourse] = useState('ba');

  const courses = {
    ba: {
      title: "B.A (Bachelor of Arts)",
      description: "Bachelor of Arts is a bachelor's degree awarded for an undergraduate program in the arts, or in some cases other disciplines. A Bachelor of Arts degree course is generally completed in three or four years, depending on the country and institution.",
      duration: "3 Years",
      eligibility: "10+2 from any recognized board",
      image: "/images/course_arts.png"
    },
    bcom: {
      title: "B.Com (Bachelor of Commerce)",
      description: "Bachelor of Commerce is an undergraduate degree in commerce and related subjects. The course is designed to provide students with a wide range of managerial skills and understanding in streams like finance, accounting, taxation and management.",
      duration: "3 Years",
      eligibility: "10+2 in Commerce or Science",
      image: "/images/course_commerce.png"
    },
    bsc: {
      title: "B.Sc (Bachelor of Science)",
      description: "Bachelor of Science is an undergraduate degree course usually of three years duration. It is one of the most popular course choices among Science students after Class 12.",
      duration: "3 Years",
      eligibility: "10+2 in Science",
      image: "/images/course_science.png"
    },
    bca: {
      title: "BCA (Bachelor of Computer Application)",
      description: "BCA is an undergraduate degree course in computer applications. With the rapid growth of IT industry in India, the demand of computer professional is increasing day by day.",
      duration: "3 Years",
      eligibility: "10+2 with Mathematics/Computer Science",
      image: "/images/it_code_image.png"
    }
  };

  const current = courses[activeCourse];

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

  return (
    <div className="w-full overflow-hidden">
      {/* Page Header */}
      <div className="bg-primary-blue text-white py-[60px] text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-[42px] font-bold mb-[10px]">University Course</h1>
          <div className="text-[14px] text-[#ccc]">Home / University Course</div>
        </motion.div>
      </div>

      <section className="py-[80px]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-[40px] items-start">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-[300px] shrink-0 bg-white border border-border-color rounded-[8px] overflow-hidden"
          >
            <h3 className="bg-primary-blue text-white p-[20px] text-[20px] font-bold">University Course</h3>
            <ul className="flex flex-col list-none p-0 m-0">
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'ba' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('ba')}>B.A (Bachelor of Arts)</li>
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'bcom' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('bcom')}>B.Com (Bachelor of Commerce)</li>
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'bsc' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('bsc')}>B.Sc (Bachelor of Science)</li>
              <li className={`py-[15px] px-[20px] border-b-0 border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'bca' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('bca')}>BCA (Bachelor of Computer Application)</li>
            </ul>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCourse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-[40px]">
                  <img src={current.image} alt={current.title} className="w-full max-h-[400px] object-cover rounded-[8px] shadow-md" />
                </div>
                <h2 className="text-[32px] text-primary-blue mb-[15px] font-bold">{current.title}</h2>
                <h3 className="text-[20px] text-text-dark mb-[15px] font-bold">Course details</h3>
                <p className="text-text-light leading-[1.7] mb-[30px]">{current.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
                  <div>
                    <h4 className="text-[20px] text-primary-blue mb-[15px] border-b-2 border-primary-red pb-[10px] inline-block font-bold">Course Content</h4>
                    <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
                      <li className="text-text-light"><strong>Duration:</strong> {current.duration}</li>
                      <li className="text-text-light"><strong>Eligibility:</strong> {current.eligibility}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[20px] text-primary-blue mb-[15px] border-b-2 border-primary-red pb-[10px] inline-block font-bold">Why you should choose Pride Online Education</h4>
                    <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
                      <li className="text-text-light flex gap-2"><span className="text-primary-red">✓</span> Expert faculty with industry experience</li>
                      <li className="text-text-light flex gap-2"><span className="text-primary-red">✓</span> Modern infrastructure and lab facilities</li>
                      <li className="text-text-light flex gap-2"><span className="text-primary-red">✓</span> 100% Placement assistance</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UGCourse;
