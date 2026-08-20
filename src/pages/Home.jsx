import React, { useState, useEffect } from 'react';
import { Plus, Minus, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import RecentCourses from '../components/RecentCourses';
import CourseEnquireModal from '../components/CourseEnquireModal';
import FAQSection from '../components/FAQSection';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const faqs = [
    { question: "What is Pride Online Education?", answer: "Pride Online Education is a trusted educational institution based in Belagavi, Karnataka, operating since 2006. We offer a wide range of distance education, online degree programs, SSLC & PUC courses, and various digital skill certifications tailored for career growth." },
    { question: "How can I apply for admission?", answer: "You can easily apply by visiting our 'Contact Us' page and filling out the inquiry form, or you can drop by our office directly at Kirloskar Road, Belagavi. Our counselors will guide you through the entire admission process step-by-step." },
    { question: "What types of courses do you offer?", answer: "We offer diverse programs including Undergraduate (B.A, B.Com, B.Sc, BCA) and Postgraduate (M.A, M.Com, MBA, MCA) distance degrees, as well as highly demanded IT certification courses like Web Development, Digital Marketing, and AutoCAD." },
    { question: "Do you provide placement assistance?", answer: "Yes, absolutely! We provide 100% placement assistance for our certification courses. Our dedicated placement cell helps students with resume building, interview preparation, and connects them with top hiring partners in the industry." },
    { question: "Are your distance education degrees recognized?", answer: "Yes, all the Undergraduate and Postgraduate distance education degrees we facilitate are fully UGC-recognized and valid for government jobs, higher education, and private sector employment." }
  ];

  const testimonials = [
    { text: "This course exceeded my expectations and made learning enjoyable and easy to follow!", name: "Sarah", role: "Software Developer" },
    { text: "Great experience learning here. The faculty is very supportive and the curriculum is well structured.", name: "Rahul K.", role: "BCA Graduate" },
    { text: "The practical sessions and projects helped me gain real-world skills. Highly recommended!", name: "Priya S.", role: "MCA Student" },
    { text: "Excellent placement support. The trainers were always available to clear my doubts.", name: "Amit V.", role: "Digital Marketing Alumni" },
    { text: "The flexibility of the distance education program allowed me to complete my B.Com while working full-time. Thank you Pride Education!", name: "Kavya M.", role: "B.Com Graduate" },
    { text: "I enrolled in the Python programming course and it completely transformed my career path. The instructors are top-notch.", name: "Suresh P.", role: "Data Analyst" },
    { text: "From admission to final exams, the entire process was smooth. The study materials provided are comprehensive and easy to understand.", name: "Anita D.", role: "MBA Professional" }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full">
      <SEO 
        title="Home - Pride Online Education" 
        description="Pride Online Education offers top-rated distance education, UG/PG degrees, and IT certification courses in Belagavi to accelerate your career."
        url="/"
      />
      {/* Hero Section */}
      <section className="bg-[#eef0f3] text-[#3a3a3a] pt-[140px] pb-[160px] relative overflow-hidden min-h-[600px]">
        {/* Background shape and image */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.9 }}
             transition={{ duration: 1.5 }}
             className="w-1/2 h-full bg-cover bg-[center_top]" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')", maskImage: "linear-gradient(to right, transparent, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 40%)" }}
           ></motion.div>
        </div>
        
        {/* White angled bottom shape */}
        <div className="absolute bottom-[-2px] left-0 right-0 z-0 h-[100px]" style={{ background: "white", clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 20%)" }}></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between">
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex-1 max-w-[650px]"
          >
            <motion.h1 variants={fadeInUp} className="text-[32px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mb-[20px] font-['Poppins'] tracking-tight text-[#333]">
              Skill Up Yourself by Pride Online Education.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[18px] md:text-[20px] mb-[40px] text-[#555] leading-[1.5] max-w-[500px]">
              Accelerate Strategy Execution and Consistency in <strong className="font-bold text-[#333]">Learning Technology</strong>
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center gap-3 cursor-pointer text-[#0B1D52] hover:text-[#ef3239] transition-colors w-fit group">
              <div className="w-[24px] h-[36px] border-[2px] border-[#ef3239] rounded-[12px] flex justify-center p-[4px]">
                <div className="w-[4px] h-[6px] bg-[#ef3239] rounded-full group-hover:animate-bounce mt-1"></div>
              </div>
              <span className="font-medium text-[15px]">Scroll Down</span>
            </motion.div>
          </motion.div>
          
          {/* Overlapping Cards */}
          <div className="flex-1 mt-[50px] lg:mt-0 relative flex justify-end w-full lg:static">
            <div className="relative lg:absolute lg:right-[calc((100%-1200px)/2+15px)] lg:-bottom-[180px] z-20 xl:right-[calc((100%-1200px)/2+15px)] w-full lg:max-w-[540px] overflow-hidden p-[15px] -m-[15px] pointer-events-none">
              <motion.div 
                initial="hidden"
                animate="show"
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-[20px] sm:w-max sm:animate-slide-cards pointer-events-auto"
              >
              
              {/* Card 1 */}
              <motion.div variants={fadeInUp} className="card-group bg-white p-[35px] rounded-[10px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full sm:w-[260px] flex flex-col items-center text-center relative transition-transform duration-300 hover:-translate-y-3">
                <div className="mb-[20px]">
                  <div className="text-[#ef3239] flex justify-center">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line><path d="M13 13h4v4h-4z"></path></svg>
                  </div>
                  {/* ZigZag Line */}
                  <div className="h-[6px] w-[56px] mx-auto mt-[15px] animate-zigzag-hover" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='6' viewBox='0 0 14 6'%3E%3Cpath d='M0 5 L3.5 1 L7 5 L10.5 1 L14 5' fill='none' stroke='%23ef3239' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}></div>
                </div>
                <h3 className="text-[17px] font-bold mb-[15px] text-[#333] font-['Poppins'] leading-[1.3]">Mobile App Development</h3>
                <p className="text-[13px] text-[#777] mb-[25px] leading-[1.6]">Have you ever thought of creating your own mobile app? If yes</p>
                <Link to="/computer-courses" className="text-[#0B1D52] font-bold text-[13px] flex items-center gap-1 hover:text-[#ef3239] transition-colors mt-auto no-underline">
                  View More <span className="text-[#ef3239] ml-1">→</span>
                </Link>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={fadeInUp} className="card-group bg-white p-[35px] rounded-[10px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full sm:w-[260px] flex flex-col items-center text-center relative transition-transform duration-300 hover:-translate-y-3">
                <div className="mb-[20px]">
                  <div className="text-[#fbb1a4] flex justify-center">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  {/* ZigZag Line */}
                  <div className="h-[6px] w-[56px] mx-auto mt-[15px] animate-zigzag-hover" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='6' viewBox='0 0 14 6'%3E%3Cpath d='M0 5 L3.5 1 L7 5 L10.5 1 L14 5' fill='none' stroke='%23ef3239' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}></div>
                </div>
                <h3 className="text-[17px] font-bold mb-[15px] text-[#333] font-['Poppins'] leading-[1.3]">PHP</h3>
                <p className="text-[13px] text-[#777] mb-[25px] leading-[1.6]">This course provides an in-depth exploration of PHP,</p>
                <Link to="/computer-courses" className="text-[#0B1D52] font-bold text-[13px] flex items-center gap-1 hover:text-[#ef3239] transition-colors mt-auto no-underline">
                  View More <span className="text-[#ef3239] ml-1">→</span>
                </Link>
              </motion.div>

              {/* Card 3 - Python */}
              <motion.div variants={fadeInUp} className="card-group bg-white p-[35px] rounded-[10px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full sm:w-[260px] flex flex-col items-center text-center relative transition-transform duration-300 hover:-translate-y-3">
                <div className="mb-[20px]">
                  <div className="text-[#3776AB] flex justify-center">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 8 5 8 5V7H16V5C16 5 16 2 12 2ZM8 7V9H4C4 9 2 9 2 13C2 17 4 17 4 17H6V15C6 12 8 12 8 12H16C16 12 18 12 18 15V19C18 19 18 22 14 22C10 22 10 19 10 19V17H12" strokeLinecap="round"/></svg>
                  </div>
                  {/* ZigZag Line */}
                  <div className="h-[6px] w-[56px] mx-auto mt-[15px] animate-zigzag-hover" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='6' viewBox='0 0 14 6'%3E%3Cpath d='M0 5 L3.5 1 L7 5 L10.5 1 L14 5' fill='none' stroke='%23ef3239' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}></div>
                </div>
                <h3 className="text-[17px] font-bold mb-[15px] text-[#333] font-['Poppins'] leading-[1.3]">Python</h3>
                <p className="text-[13px] text-[#777] mb-[25px] leading-[1.6]">Learn the fundamentals of Python for software and data</p>
                <Link to="/computer-courses" className="text-[#0B1D52] font-bold text-[13px] flex items-center gap-1 hover:text-[#ef3239] transition-colors mt-auto no-underline">
                  View More <span className="text-[#ef3239] ml-1">→</span>
                </Link>
              </motion.div>
              
              </motion.div>
            </div>
            {/* Dots */}
            <div className="absolute right-[220px] bottom-[-30px] flex gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-[#bbb]"></div>
              <div className="w-[12px] h-[6px] rounded-full bg-[#555]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="pt-[60px] lg:pt-[80px] pb-[100px] bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[80px]">
          
          {/* Images Grid */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex-1 w-full grid grid-cols-2 gap-[15px]"
          >
            <motion.div variants={fadeInUp} className="col-span-1 row-span-2">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop" className="w-full h-full min-h-[300px] lg:min-h-[450px] object-cover" alt="Modern Office" />
            </motion.div>
            <motion.div variants={fadeInRight} className="col-span-1">
              <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=600&auto=format&fit=crop" className="w-full h-full min-h-[142px] lg:min-h-[217px] object-cover" alt="Students painting" />
            </motion.div>
            <motion.div variants={fadeInRight} className="col-span-1">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" className="w-full h-full min-h-[142px] lg:min-h-[217px] object-cover" alt="Students studying" />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex-1 flex flex-col items-start lg:pl-[20px]"
          >
            <motion.div variants={fadeInUp} className="uppercase tracking-[0.15em] text-[#1a2352] font-bold text-[13px] mb-[20px] relative inline-block z-10">
              ABOUT US
              <div className="absolute bottom-[2px] left-0 w-full h-[6px] bg-[#d5dcee] -z-10"></div>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-[28px] md:text-[36px] lg:text-[44px] text-[#222] font-bold leading-[1.1] mb-[30px] font-['Poppins']">
              You have come to right place. Let the search for the right course begin!
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center sm:items-start gap-[20px] sm:gap-[30px] mb-[45px]">
              {/* Stat Icon & Number */}
              <div className="flex items-center gap-[15px]">
                <div className="w-[60px] h-[60px] flex justify-center items-center">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="7" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662" />
                    <path d="M12 22l-3 3-2-2-2 2v-4" />
                    <path d="M12 22l3 3 2-2 2 2v-4" />
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[34px] font-bold text-[#111] leading-none mb-[2px]">240+</div>
                  <div className="text-[13px] font-bold text-[#111] leading-[1.3]">Satisfied<br/>Students</div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="hidden sm:block w-[4px] h-[65px] bg-[#f0f0f0] mt-[5px]"></div>
              
              {/* Description */}
              <p className="text-[#666] text-[15px] sm:max-w-[260px] leading-[1.6] mt-[5px]">
                Endless possibilities for creativity, learning, and innovation.
              </p>
            </motion.div>
            
            <motion.button 
              variants={fadeInUp} 
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-[#161c44] text-white px-[40px] py-[15px] font-semibold text-[15px] transition-transform hover:-translate-y-1" 
              style={{ boxShadow: "6px 6px 0px #8e9bc5" }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
          
        </div>
      </section>

      {/* Our Course Section */}
      <section className="py-[100px] bg-[#f9fafc]">
        <div className="container mx-auto px-4 max-w-[1240px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[50px] gap-4"
          >
            <h2 className="text-[26px] md:text-[36px] text-[#222222] font-extrabold mb-0 font-['Poppins'] text-center md:text-left">Pride Online Education Have Course Categories</h2>
            <Link to="/ug-course" className="bg-[#ef3239] text-white px-[30px] py-[15px] font-bold rounded-md transition-colors hover:bg-red-700 hover:shadow-lg no-underline font-['Poppins'] tracking-wide text-[16px] inline-block">Explore Courses</Link>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
          >
            <motion.div variants={fadeInUp}>
              <CourseCard title="BA & Distance Mode" description="Bachelor of Arts in India is an art degree that basically focuses on" to="/ba-admission" image="/images/course_arts.png" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CourseCard title="B.Com & Distance Mode" description="Our B.Com program equips students with strong knowledge in finance" to="/bcom-admission" image="/images/course_commerce.png" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CourseCard title="B.Sc & Distance Mode" description="For students passionate about science and research,." to="/online-degree" image="/images/course_science.png" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CourseCard title="Master of Arts (M.A.)" description="Master of Arts is a postgraduate program designed to expand" to="/pg-course" image="/images/course_arts.png" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CourseCard title="Master of Commerce (M.Com)" description="Advance your career in accounting, finance, and taxation" to="/pg-course" image="/images/course_mcom.png" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CourseCard title="Master of Business Administration" description="Develop essential management and leadership skills" to="/pg-course" image="/images/course_mba.png" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* FAQ Section */}
      <section id="faqs" className="bg-secondary-gray overflow-hidden pb-[80px]">
        <FAQSection faqs={faqs} />
      </section>
      
      {/* Benefits Section using Framer Motion */}
      <section className="flex flex-col lg:flex-row w-full relative z-10 overflow-hidden">
        
        {/* Left Side - Blue */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 bg-[#2a3861] relative flex items-center justify-end min-h-[400px] lg:min-h-[500px]"
        >
          {/* Bokeh Background Simulation */}
          <motion.div 
            variants={{ hidden: { opacity: 0 }, show: { opacity: 0.03, transition: { duration: 1.5 } } }}
            className="absolute inset-0" 
            style={{ backgroundImage: "radial-gradient(circle at 30% 70%, white 0%, white 30%, transparent 30.1%), radial-gradient(circle at 80% 20%, white 0%, white 25%, transparent 25.1%), radial-gradient(circle at 10% 20%, white 0%, white 20%, transparent 20.1%)", backgroundSize: "250px 250px" }}
          ></motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } } }}
            className="absolute top-[40px] left-[80px] w-[40px] h-[40px] rounded-full border border-[#1d2645] flex items-center justify-center"
          >
            <div className="w-[4px] h-[4px] rounded-full bg-[#1d2645]"></div>
          </motion.div>
          {/* Zigzag shape faint */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 0.1, y: 0, transition: { duration: 1, delay: 0.5 } } }}
            className="absolute top-[30%] left-[30%]"
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="4"><polyline points="0,50 25,25 50,50 75,25 100,50" /></svg>
          </motion.div>
          
          {/* Watermark Text */}
          <motion.h2 
            variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
            className="text-[70px] md:text-[100px] lg:text-[140px] font-extrabold text-[#36456f] uppercase tracking-wider font-['Poppins'] leading-none select-none absolute right-[-40px] lg:right-[-120px] z-20"
          >
            BENEFITS
          </motion.h2>
        </motion.div>

        {/* Right Side - Dark */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex-1 bg-[#26292d] p-[50px] lg:p-[100px] flex flex-col justify-center relative z-0"
        >
          <motion.div variants={fadeInUp} className="uppercase tracking-[0.15em] text-[#1c3e8a] font-bold text-[14px] mb-[15px]">
            WHY US
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] text-white font-bold leading-[1.2] mb-[20px] font-['Poppins']">
            Learn Here The Main Reasons<br className="hidden md:block" />Why You Should Choose Us
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#8a8d91] text-[15px] mb-[45px]">
            You have come to right place. Let the search for the right course begin!
          </motion.p>
          
          <div className="flex flex-col gap-[25px]">
            {['Unlimited Materials', 'Expert Instructor', 'Online Learning'].map((item, index) => (
              <motion.div variants={fadeInUp} key={index} className="flex items-center gap-[20px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#525964] flex justify-center items-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[#999ea6] text-[16px] font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Angled Bottom Shape */}
        <div className="absolute bottom-[-2px] left-0 right-0 h-[60px] z-30 pointer-events-none" style={{ background: "white", clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 30%)" }}></div>
      </section>

      <RecentCourses />

      {/* Testimonials */}
      {/* Testimonials */}
      <Testimonials reviews={testimonials} />
      
      <CourseEnquireModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        defaultCourse="Get Quote" 
      />
    </div>
  );
};

export default Home;
