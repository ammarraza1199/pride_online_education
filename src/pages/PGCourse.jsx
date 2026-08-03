import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PGCourse = () => {
  const [activeCourse, setActiveCourse] = useState('ma');

  const courses = {
    ma: {
      title: "M.A (Master of Arts)",
      description: "Master of Arts is a postgraduate degree program that allows students to specialize in a specific subject in the humanities or social sciences. It builds upon the foundational knowledge gained during undergraduate studies.",
      duration: "2 Years",
      eligibility: "Bachelor's degree in relevant field",
      image: "/images/course_arts.png"
    },
    mcom: {
      title: "M.Com (Master of Commerce)",
      description: "Master of Commerce is a postgraduate academic degree which focuses on commerce, accounting, management and economics related subjects. It provides deeper insight into financial and business management.",
      duration: "2 Years",
      eligibility: "B.Com or relevant Bachelor's degree",
      image: "/images/course_mcom.png"
    },
    mba: {
      title: "MBA (Master of Business Administration)",
      description: "The Master of Business Administration is a highly valued professional degree designed to develop the skills required for careers in business and management. It covers various aspects of business operations.",
      duration: "2 Years",
      eligibility: "Bachelor's degree in any discipline",
      image: "/images/course_mba.png"
    },
    mca: {
      title: "MCA (Master of Computer Application)",
      description: "Master of Computer Applications is a postgraduate program designed for students who want to delve deeper into the world of computer application development with learning modern programming language.",
      duration: "2 Years",
      eligibility: "BCA / B.Sc (Computer Science) / Bachelor's degree with Mathematics",
      image: "/images/it_data_image.png"
    }
  };

  const current = courses[activeCourse];

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
          <h1 className="text-[42px] font-bold mb-[10px]">PG Course</h1>
          <div className="text-[14px] text-[#ccc]">Home / PG Course</div>
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
            <h3 className="bg-primary-blue text-white p-[20px] text-[20px] font-bold">PG Course</h3>
            <ul className="flex flex-col list-none p-0 m-0">
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'ma' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('ma')}>M.A (Master of Arts)</li>
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'mcom' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('mcom')}>M.Com (Master of Commerce)</li>
              <li className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'mba' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('mba')}>MBA (Master of Business Administration)</li>
              <li className={`py-[15px] px-[20px] border-b-0 border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourse === 'mca' ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`} onClick={() => setActiveCourse('mca')}>MCA (Master of Computer Application)</li>
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

export default PGCourse;
