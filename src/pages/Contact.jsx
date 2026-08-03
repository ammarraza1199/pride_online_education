import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
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
    <div className="w-full overflow-hidden">
      {/* Page Header */}
      <div className="bg-primary-blue text-white py-[60px] text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-[42px] font-bold mb-[10px]">Contact Us</h1>
          <div className="text-[14px] text-[#ccc]">Home / Contact Us</div>
        </motion.div>
      </div>

      <section className="py-[80px]">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[32px] text-primary-blue font-bold text-center mb-[50px]"
          >
            Contact Us
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-[50px] items-stretch">
            {/* Contact Info */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="flex-1 flex flex-col gap-[30px] bg-secondary-gray p-[40px] rounded-[8px]"
            >
              <div className="flex items-start gap-[20px]">
                <div className="w-[50px] h-[50px] bg-primary-red rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} color="white" />
                </div>
                <div>
                  <h4 className="text-[18px] text-primary-blue mb-[5px] font-bold">Address</h4>
                  <p className="text-text-light leading-[1.5]">1749/2D 3rd floor, Above SBI Bank Mujawar building kirloskar road belagavi</p>
                </div>
              </div>

              <div className="flex items-start gap-[20px]">
                <div className="w-[50px] h-[50px] bg-primary-red rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} color="white" />
                </div>
                <div>
                  <h4 className="text-[18px] text-primary-blue mb-[5px] font-bold">Phone No</h4>
                  <p className="text-text-light leading-[1.5]">+91 7760345397</p>
                </div>
              </div>

              <div className="flex items-start gap-[20px]">
                <div className="w-[50px] h-[50px] bg-primary-red rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} color="white" />
                </div>
                <div>
                  <h4 className="text-[18px] text-primary-blue mb-[5px] font-bold">Email Id</h4>
                  <p className="text-text-light leading-[1.5]">info@prideonlineeducation.com</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="flex-1 bg-white p-[40px] rounded-[8px] shadow-[0_5px_20px_rgba(0,0,0,0.05)]"
            >
              <form className="flex flex-col gap-[20px]" onSubmit={(e) => e.preventDefault()}>
                <div className="w-full">
                  <input type="text" placeholder="Full Name" className="w-full p-[15px] border border-border-color rounded-[4px] text-[16px] bg-[#fcfcfc] focus:outline-none focus:border-primary-red" />
                </div>
                <div className="w-full">
                  <input type="text" placeholder="Mobile Number" className="w-full p-[15px] border border-border-color rounded-[4px] text-[16px] bg-[#fcfcfc] focus:outline-none focus:border-primary-red" />
                </div>
                <div className="w-full">
                  <input type="email" placeholder="Email Id" className="w-full p-[15px] border border-border-color rounded-[4px] text-[16px] bg-[#fcfcfc] focus:outline-none focus:border-primary-red" />
                </div>
                <div className="w-full">
                  <textarea placeholder="Message" className="w-full p-[15px] border border-border-color rounded-[4px] text-[16px] bg-[#fcfcfc] focus:outline-none focus:border-primary-red" rows="5"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="bg-primary-red text-white p-[15px] text-[16px] w-auto self-start rounded-md font-semibold transition-colors hover:bg-[#c92128]"
                >
                  Submit Now
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
