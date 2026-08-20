import React, { useState } from 'react';
import SEO from './SEO';
import Schema from './Schema';
import Breadcrumbs from './Breadcrumbs';
import FAQSection from './FAQSection';
import CourseEnquireModal from './CourseEnquireModal';
import { Clock, CheckCircle, GraduationCap, Banknote } from 'lucide-react';

const CourseLayout = ({ 
  title, 
  metaDescription, 
  slug,
  heroSubtitle,
  courseDetails,
  eligibility,
  duration,
  universityInfo,
  admissionProcess,
  fees,
  faqs 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullUrl = `https://prideonlineeducation.com/${slug}`;

  return (
    <div className="w-full bg-[#f9fafc]">
      <SEO 
        title={`${title} - Pride Online Education`} 
        description={metaDescription} 
        canonical={fullUrl}
      />
      <Schema 
        type="Course"
        data={{
          name: title,
          description: metaDescription,
          provider: {
            "@type": "EducationalOrganization",
            name: "Pride Online Education",
            sameAs: "https://prideonlineeducation.com"
          }
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-[#0B1D52] pt-[60px] pb-[80px]">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-[36px] md:text-[48px] font-extrabold font-['Poppins'] leading-tight mb-4 text-white">
              {title}
            </h1>
            <p className="text-[18px] text-[#d5dcee] mb-8">{heroSubtitle}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ef3239] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg border-none cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1 min-w-0 bg-white p-8 rounded-lg shadow-sm border border-[#eaeaea] overflow-hidden">
            <h2 className="text-[28px] font-bold text-[#222] mb-6 font-['Poppins']">Course Details</h2>
            <div className="text-[#555] leading-relaxed mb-8 space-y-4" dangerouslySetInnerHTML={{ __html: courseDetails?.replace(/&nbsp;/g, ' ') }} />
            
            <h2 className="text-[28px] font-bold text-[#222] mb-6 font-['Poppins'] mt-10">Admission Process</h2>
            <div className="text-[#555] leading-relaxed mb-8 space-y-4">
               {admissionProcess || "Our admission process is straightforward. Fill out the enquiry form, and our career counselors will guide you through the document submission and university registration process step-by-step."}
            </div>

            {faqs && faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[28px] font-bold text-[#222] mb-6 font-['Poppins']">Frequently Asked Questions</h2>
                <FAQSection faqs={faqs} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#eaeaea]">
              <h3 className="text-[20px] font-bold text-[#0B1D52] mb-6 border-b pb-4">Course Overview</h3>
              
              <ul className="space-y-5 m-0 p-0 list-none">
                <li className="flex items-start gap-4">
                  <Clock className="text-[#ef3239] mt-1" size={24} />
                  <div>
                    <strong className="block text-[#222]">Duration</strong>
                    <span className="text-[#666]">{duration}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#ef3239] mt-1" size={24} />
                  <div>
                    <strong className="block text-[#222]">Eligibility</strong>
                    <span className="text-[#666]">{eligibility}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <GraduationCap className="text-[#ef3239] mt-1" size={24} />
                  <div>
                    <strong className="block text-[#222]">University Info</strong>
                    <span className="text-[#666]">{universityInfo || "UGC Recognized University"}</span>
                  </div>
                </li>
                {fees && (
                <li className="flex items-start gap-4">
                  <Banknote className="text-[#ef3239] mt-1" size={24} />
                  <div>
                    <strong className="block text-[#222]">Fees</strong>
                    <span className="text-[#666]">{fees}</span>
                  </div>
                </li>
                )}
              </ul>
            </div>
            
            <div className="bg-[#f0f2f5] p-6 rounded-lg text-center border border-[#e2e8f0]">
              <h3 className="text-[18px] font-bold text-[#222] mb-3">Need Help with Admission?</h3>
              <p className="text-[#555] text-sm mb-4">Talk to our expert counselors today.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#0B1D52] hover:bg-[#142B63] text-white font-bold py-3 px-4 rounded-md transition-colors border-none cursor-pointer"
              >
                Request a Callback
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <CourseEnquireModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultCourse={title} 
      />
    </div>
  );
};

export default CourseLayout;
