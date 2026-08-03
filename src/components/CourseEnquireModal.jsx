import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CourseEnquireModal = ({ isOpen, onClose, defaultCourse = "" }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: defaultCourse,
    comment: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, course: defaultCourse }));
    }
  }, [isOpen, defaultCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-50 font-['Poppins']">
      <div className="bg-white w-full max-w-[600px] rounded-lg shadow-xl mx-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-[22px] font-bold text-[#222]">Course Enquire</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-[120px] text-right text-gray-500 text-[15px]">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type your name..." 
                className="flex-1 border border-gray-200 rounded p-3 text-[14px] text-gray-700 outline-none focus:border-[#ef3239] transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-[120px] text-right text-gray-500 text-[15px]">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your email..." 
                className="flex-1 border border-gray-200 rounded p-3 text-[14px] text-gray-700 outline-none focus:border-[#ef3239] transition-colors"
                required
              />
            </div>

            {/* Course */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-[120px] text-right text-gray-500 text-[15px]">Course</label>
              <div className="flex-1 relative">
                <select 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-3 text-[14px] text-gray-700 appearance-none outline-none focus:border-[#ef3239] transition-colors bg-white cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Course</option>
                  <option value="IT Courses">IT Courses</option>
                  <option value="UG Courses">UG Courses</option>
                  <option value="PG Courses">PG Courses</option>
                  <option value="Get Quote">Get Quote</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <label className="sm:w-[120px] text-right text-gray-500 text-[15px] pt-3">Comment</label>
              <textarea 
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Type your comment..." 
                rows="5"
                className="flex-1 border border-gray-200 rounded p-3 text-[14px] text-gray-700 outline-none focus:border-[#ef3239] transition-colors resize-y"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-600 font-semibold rounded hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-[#ef3239] text-white font-bold rounded hover:bg-[#d92a30] transition-colors shadow-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseEnquireModal;
