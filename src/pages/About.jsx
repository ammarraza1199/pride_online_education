import React from 'react';
import { Phone, Award, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <div className="w-full font-['Poppins',sans-serif] text-[#333]">
      {/* Top angled background header */}
      <div className="w-full h-[300px] bg-[#f9fafc] flex flex-col justify-center items-center relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="text-[13px] text-[#888] font-semibold flex items-center gap-2 mb-2 uppercase tracking-widest mt-[-20px]">
            <Link to="/" className="text-[#0B1D52] no-underline hover:underline">HOME</Link>
            <ChevronRight size={14} />
            <span>ABOUT US</span>
          </div>
          <h1 className="text-[46px] font-extrabold text-[#222] tracking-tight">About Us</h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-[1200px] pt-[60px] pb-32 mb-16">
        {/* Top Section */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-[80px]"
        >
          <div className="w-full">
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[38px] font-bold text-[#222] mb-[25px] leading-tight">Empowering Learners Since 2006</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#666] text-[16px] leading-[1.8] mb-[20px]">
              Pride Online Education is a trusted educational institution based in Belagavi, Karnataka, offering a wide range of distance education, online degree programs, SSLC & PUC courses, and digital skill certifications.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-[#666] text-[16px] leading-[1.8] mb-[40px]">
              Founded on April 16, 2006, our journey began with Global IT Solutions, a training and testing center focused on career-oriented learning. Over the years, we partnered with major education brands like Rooman Technologies, Global Technologies, and New Horizons, gaining valuable experience in training and placement.
            </motion.p>
            
            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row items-center gap-[30px] border-l-4 lg:border-l-0 lg:border-t border-[#eee] pl-[20px] lg:pl-0 lg:pt-[30px]">
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-[60px] h-[60px] rounded-full border-[3px] border-[#222] flex items-center justify-center relative">
                   <Award size={30} color="#222" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[34px] font-black text-[#222] leading-[1]">240+</div>
                  <div className="text-[13px] font-bold text-[#222] mt-[2px]">Satisfied students</div>
                </div>
              </div>
              
              <div className="hidden lg:block w-[1px] h-[80px] bg-[#eee]"></div>
              
              <p className="flex-1 text-[#888] text-[14px] leading-[1.6] m-0">
                Today, we operate independently as Pride Online Education, continuing to run Global IT Solutions - Testing Center alongside our new academic initiatives.
              </p>
              
              <div className="flex items-center gap-[20px]">
                <button className="bg-[#222] text-white px-[25px] py-[14px] text-[15px] font-bold rounded hover:bg-[#444] transition-colors whitespace-nowrap shadow-md">
                  Contact Us
                </button>
                <div className="flex items-center gap-2 text-[#222] font-bold whitespace-nowrap">
                  <Phone size={20} />
                  <span className="text-[15px]">+91 7760345397</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Presence Section */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-[50px]"
        >
          <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[36px] font-bold text-[#222] mb-[20px]">Our Presence in Belagavi</motion.h2>
          <motion.p variants={fadeInUp} className="text-[#666] text-[16px] leading-[1.8] max-w-[1000px]">
            With over 16 years of continuous presence in Belagavi, we have trained and supported thousands of students from various backgrounds. Our deep connection with the community and commitment to student success make us a preferred destination for academic and professional growth.
          </motion.p>
        </motion.div>

        {/* Two Columns */}
        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px]">
          {/* What We Offer */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="flex-1"
          >
            <motion.h3 variants={fadeInUp} className="text-[24px] md:text-[28px] font-bold text-[#222] mb-[25px]">What We Offer</motion.h3>
            <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
              {[
                "Distance Education Programs (UG & PG)",
                "Online Academic Degrees from recognized universities",
                "SSLC (10th) & PUC (11th & 12th) Programs",
                "MKCL Authorized Center for certified IT and digital literacy courses",
                "Job-oriented Certification Courses in IT, communication, and soft skills",
                "Career Counseling & Placement Support"
              ].map((item, idx) => (
                <motion.li variants={fadeInLeft} key={idx} className="flex items-start gap-[12px]">
                  <div className="mt-[6px] text-[#0B1D52]">
                    <svg width="12" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <span className="text-[#666] text-[16px] leading-[1.5]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose Pride Online Education */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="flex-1"
          >
            <motion.h3 variants={fadeInUp} className="text-[24px] md:text-[28px] font-bold text-[#222] mb-[25px]">Why Choose Pride Online Education?</motion.h3>
            <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
              {[
                "16+ Years of Experience in Teaching & Training",
                "Experienced Faculty & Individual Attention",
                "Flexible Learning Options - Online & Offline",
                "Government-Recognized Programs",
                "Placement Assistance & Skill Development",
                "Trusted by Thousands of Students in Belagavi"
              ].map((item, idx) => (
                <motion.li variants={fadeInLeft} key={idx} className="flex items-start gap-[12px]">
                  <div className="mt-[2px] text-[#0B1D52]">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <span className="text-[#666] text-[16px] leading-[1.5]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
