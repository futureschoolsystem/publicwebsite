'use client';
import Link from 'next/link'
import { FaPhone, FaMobileAlt, FaEnvelope,FaUser } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <div className="bg-blue-800 text-white px-4 py-3 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
        
        {/* Left: Contact Info */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs md:text-sm">
          <div className="flex items-center">
            <FaPhone className="mr-1 text-white/70" />
            <span>044-2715620</span>
          </div>
          <div className="flex items-center">
            <FaMobileAlt className="mr-1 text-white/70" />
            <span>+92 311-2306050</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-1 text-white/70" />
            <span>futureschool786@gmail.com</span>
          </div>
        </div>

        {/* Right: Login Portal Link */}
          <div className="flex items-center">
            {/* Divider - hidden on mobile */}
            <div className="hidden lg:block w-px h-8 bg-blue-600/50 mr-6"></div>
            
            <Link 
              href="/login" 
              className="hidden lg:flex items-center bg-blue-700/50 hover:bg-blue-600 px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 group border border-blue-600/30 hover:border-blue-500"
            >
              <FaUser className="mr-2 text-sm group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium text-sm">Login Portal</span>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default TopHeader;
