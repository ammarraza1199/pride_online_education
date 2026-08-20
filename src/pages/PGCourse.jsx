import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const PGCourse = () => {
  const [pgCourses, setPgCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), where('category', '==', 'PG'));
        const querySnapshot = await getDocs(q);
        const courses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPgCourses(courses);
        if (courses.length > 0) {
          setActiveCourseId(courses[0].id);
        }
      } catch (error) {
        console.error("Error fetching PG courses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const current = pgCourses.find(c => c.id === activeCourseId) || null;

  return (
    <div className="w-full overflow-hidden">
      <SEO 
        title="Postgraduate (PG) Courses - Pride Online Education" 
        description="Advance your career with recognized Postgraduate distance education degrees including M.A, M.Com, MBA, and MCA."
        url="/pg-course"
      />
      {/* Page Header */}
      <div className="bg-primary-blue text-white py-[60px] text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-[42px] font-bold mb-[10px]">Postgraduate Courses</h1>
          <div className="text-[14px] text-[#ccc]">Home / Postgraduate Courses</div>
        </motion.div>
      </div>

      <section className="py-[80px]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-[40px] items-start">

          {loading ? (
            <div className="w-full flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin"></div>
            </div>
          ) : pgCourses.length === 0 ? (
            <div className="w-full text-center text-gray-500 py-10">No postgraduate courses found.</div>
          ) : (
            <>
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[300px] shrink-0 bg-white border border-border-color rounded-[8px] overflow-hidden"
              >
                <h3 className="bg-primary-blue text-white p-[20px] text-[20px] font-bold">PG Courses</h3>
                <ul className="flex flex-col list-none p-0 m-0 max-h-[500px] overflow-y-auto">
                  {pgCourses.map((course) => (
                    <li
                      key={course.id}
                      className={`py-[15px] px-[20px] border-b border-border-color cursor-pointer font-medium transition-all duration-300 ${activeCourseId === course.id ? 'bg-primary-red text-white' : 'text-text-dark hover:bg-secondary-gray hover:text-primary-red'}`}
                      onClick={() => setActiveCourseId(course.id)}
                    >
                      {course.title}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Main Content */}
              {current && (
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-[40px]">
                        <img src={current.image || '/images/course_mba.png'} alt={current.title} className="w-full max-h-[400px] object-cover rounded-[8px] shadow-md" />
                      </div>
                      <h2 className="text-[32px] text-primary-blue mb-[15px] font-bold">{current.title}</h2>
                      <h3 className="text-[20px] text-text-dark mb-[15px] font-bold">Course details</h3>
                      <p className="text-text-light leading-[1.7] mb-[30px]">{current.description || current.seoDescription}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
                        <div>
                          <h4 className="text-[20px] text-primary-blue mb-[15px] border-b-2 border-primary-red pb-[10px] inline-block font-bold">Course Content</h4>
                          <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
                            <li className="text-text-light"><strong>Duration:</strong> {current.duration || '2 Years'}</li>
                            <li className="text-text-light"><strong>Eligibility:</strong> {current.eligibility || 'Graduation from recognized university'}</li>
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

                      <div className="mt-[40px]">
                        <Link to={`/${current.slug}`} className="inline-block bg-primary-red text-white py-[12px] px-[24px] rounded-[4px] font-bold hover:bg-primary-blue transition-colors duration-300">
                          View Full Course Details
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PGCourse;
