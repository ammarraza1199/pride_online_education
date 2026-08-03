import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, image, to = "/ug-course" }) => {
  return (
    <Link to={to} className="group flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow rounded-sm overflow-hidden h-full border border-[#f0f0f0] no-underline relative">
      {/* Top Dark Section */}
      <div className="bg-[#4a4f54] relative h-[220px] p-[30px] flex flex-col justify-end overflow-hidden">
        {image ? (
          <>
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#3c4146] text-[36px] font-extrabold select-none z-0 tracking-wide font-['Inter']">
            393x205
          </div>
        )}
        <div className="relative z-10">
          <h3 className="text-[22px] font-bold text-white leading-tight mb-[15px] font-['Poppins'] tracking-wide">{title}</h3>
          {/* Red Zigzag */}
          <div className="h-[8px] w-[60px] bg-repeat-x bg-[length:14px_8px]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M0 7 L3.5 1 L7 7 L10.5 1 L14 7' fill='none' stroke='%23ef3239' stroke-width='2' stroke-linejoin='miter' stroke-miterlimit='10'/%3E%3C/svg%3E\")" }}></div>
        </div>
      </div>
      
      {/* Bottom White Section */}
      <div className="p-[30px] bg-white flex flex-col justify-between flex-1 relative">
        <p className="text-[#888888] text-[15px] leading-[1.6] line-clamp-2 font-medium font-['Poppins'] pr-[40px] m-0">{description}</p>
        <div className="absolute right-[30px] bottom-[30px] flex justify-end text-[#ef3239] transition-transform duration-300 ease-out group-hover:translate-x-2">
          <ArrowRight color="#ef3239" size={24} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
